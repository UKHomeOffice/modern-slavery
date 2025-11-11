/* eslint-disable consistent-return */
/* eslint-disable no-console */
'use strict';

const appConfig = require('../../../config');
const GetFileToken = require('../models/file-upload');
const Producer = require('sqs-producer');
const { ServiceBusClient } = require('@azure/service-bus');
const uuid = require('uuid/v4');
const { model: Model } = require('hof');
const { encodeEmail } = require('../../../lib/utilities');
let db;

if (appConfig.audit.enabled) {
  db = require('./../../common/db');
}

module.exports = conf => {
  const config = conf || {};
  let producer;
  let serviceBusClient;
  let serviceBusSender;

  if (appConfig.writeToCasework) {
    // Initialize AWS SQS
    producer = Producer.create({
      queueUrl: appConfig.aws.sqs,
      region: 'eu-west-2'
    });

    console.log(appConfig.azure.connectionString);
    console.log(appConfig.azure.queueName);

    if (appConfig.azure.connectionString && appConfig.azure.queueName) {
      // Initialize Azure Service Bus
      serviceBusClient = new ServiceBusClient(appConfig.azure.connectionString);
      serviceBusSender = serviceBusClient.createSender(appConfig.azure.queueName);
    }
  }

  return superclass => class extends superclass {
    async sendToServiceBus(message, caseworkID) {
      try {
        if (!serviceBusSender) {
          throw new Error('Azure Service Bus is not configured properly.');
        }
        await serviceBusSender.sendMessages({
          body: message,
          messageId: caseworkID
        });
        return null;
      } catch (error) {
        return error;
      }
    }

    saveValues(req, res, next) {
      super.saveValues(req, res, async err => {
        if (err) {
          return next(err);
        }
        try {
          const model = new GetFileToken();
          const token = await model.auth();
          const caseWorkPayload = appConfig.writeToCasework ? config.prepare(req.sessionModel.toJSON(), token) :
            { info: 'No submission was made to icasework' };

          const externalID = req.sessionModel.get('externalID') || caseWorkPayload.ExternalId;

          // Report ID from save and return to make logs clearer
          const reportID = req.sessionModel.get('id');

          req.sessionModel.set('jsonPayload', caseWorkPayload);

          // short circuit casework submission
          if (!appConfig.writeToCasework) {
            await this.deleteSessionData(req, next);
            next();
          } else {
            // send casework model to AWS SQS
            const caseworkModel = config.prepare(req.sessionModel.toJSON(), token);
            const caseworkID = uuid();
            req.log('info', `External ID: ${externalID}, Report ID: ${reportID},
            Submitting Case to Queue Case ID: ${caseworkID}`);
            producer.send([{
              id: caseworkID,
              body: JSON.stringify(caseworkModel)
            }], async error => {
              const sqsError = error ? 'Error Submitting to Queue: ' + error : 'Successful Submission to Queue';
              req.log('info', `External ID: ${externalID}, Report ID: ${reportID},
              Queue Submission Status: ${sqsError}`);

              // Send to Azure Service Bus
              const serviceBusError = await this.sendToServiceBus(caseworkModel, caseworkID);
              const serviceBusStatus = serviceBusError ?
                'Error Submitting to Service Bus: ' + serviceBusError :
                'Successful Submission to Service Bus';
              req.log('info', `External ID: ${externalID}, 
                Report ID: ${reportID}, Service Bus Status: ${serviceBusStatus}`);

              // Only proceed if both operations were successful
              const combinedError = error || serviceBusError;

              // Ensure session data is deleted only when both operations have completed without errors
              if (!combinedError) {
                await this.deleteSessionData(req, next);
              }

              if (appConfig.audit.enabled) {
                db('hof').insert({
                  ip: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
                  type: caseworkModel.Type,
                  success: combinedError ? false : true
                }).then(() => {
                  req.log('info', 'MS: hof insert successfully');
                  next(combinedError);
                });
              } else {
                next(combinedError);
              }
            });
          }
        } catch (error) {
          req.log('error', `Error saving values: ${error}`);
          next(error);
        }
      });
    }

    async deleteSessionData(req, next) {
      const hofModel = new Model();
      const params = {
        url: `${appConfig.saveService.host}:${
          appConfig.saveService.port
        }/reports/${encodeEmail(
          req.sessionModel.get('user-email')
        )}/${req.sessionModel.get('id')}`,
        method: 'DELETE'
      };
      try {
        await hofModel._request(params);
        req.log('info', 'MS: record deleted successfully');
      } catch (error) {
        req.log('error', `Error deleting data: ${error.message}`);
        next(error);
      }
    }
  };
};
