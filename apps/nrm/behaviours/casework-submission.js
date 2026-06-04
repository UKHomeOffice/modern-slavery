/* eslint-disable consistent-return */
'use strict';

const appConfig = require('../../../config');
const GetFileToken = require('../models/file-upload');
const { ServiceBusClient } = require('@azure/service-bus');
const { v4: uuidv4 } = require('uuid');
const { model: Model } = require('hof');
const { encodeEmail } = require('../../../lib/utilities');
let db;

if (appConfig.audit.enabled) {
  db = require('./../../common/db');
}

module.exports = conf => {
  const config = conf || {};
  let serviceBusSender;

  if (appConfig.azure.sendToAzure && appConfig.azure.connectionString && appConfig.azure.queueName) {
    // Initialize Azure Service Bus
    const serviceBusClient = new ServiceBusClient(appConfig.azure.connectionString);
    serviceBusSender = serviceBusClient.createSender(appConfig.azure.queueName);
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

          // Report ID from save and return to make logs clearer
          const reportID = req.sessionModel.get('id');

          const caseworkModel = config.prepare(req.sessionModel.toJSON(), token);
          const caseworkID = uuidv4();
          req.log('info', `Report ID: ${reportID},
            Submitting Case to Queue Case ID: ${caseworkID}`);

          req.log('info', 'Azure Service Bus integration is', appConfig.azure.sendToAzure ? 'enabled' : 'disabled');
          // Send to Azure Service Bus
          let serviceBusError = null;

          serviceBusError = await this.sendToServiceBus(caseworkModel, caseworkID);
          const serviceBusStatus = serviceBusError ?
            'Error Submitting to Azure Service Bus: ' + serviceBusError :
            'Successful Submission to Azure Service Bus';
          req.log('info', `Report ID: ${reportID}, Azure Service Bus Status: ${serviceBusStatus}`);

          // Ensure session data is deleted only when both operations have completed without errors
          if (!serviceBusError) {
            await this.deleteSessionData(req, next);
          }

          if (appConfig.audit.enabled) {
            db('hof').insert({
              ip: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
              type: caseworkModel.Type,
              success: serviceBusError ? false : true
            }).then(() => {
              req.log('info', 'MS: hof insert successfully');
              next(serviceBusError);
            });
          } else {
            next(serviceBusError);
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
        url: `${appConfig.saveService.host}:${appConfig.saveService.port
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
