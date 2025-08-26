/* eslint-disable consistent-return */
'use strict';

const { model: Model } = require('hof');
const appConfig = require('../../../config');
const baseUrl = appConfig.saveService.host + ':' + appConfig.saveService.port + '/reports/';
const GetFileToken = require('../models/file-upload');
const Producer = require('sqs-producer');
const uuid = require('uuid/v4');
let db;

if (appConfig.audit.enabled) {
  db = require('./../../common/db');
}

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = conf => {
  const config = conf || {};
  let producer;

  if (appConfig.writeToCasework) {
    producer = Producer.create({
      queueUrl: appConfig.aws.sqs,
      region: 'eu-west-2'
    });
  }

  return superclass => class extends superclass {
    saveValues(req, res, next) {
      super.saveValues(req, res, async err => {
        if (err) {
          return next(err);
        }
        try {
          const uploadModel = new GetFileToken();
          const token = await uploadModel.auth();
          const caseWorkPayload = appConfig.writeToCasework ? config.prepare(req.sessionModel.toJSON(), token) :
            { info: 'No submission was made to icasework' };

          const externalID = req.sessionModel.get('externalID') || caseWorkPayload.ExternalId;

          // Report ID from save and return to make logs clearer
          const reportID = req.sessionModel.get('id');

          req.sessionModel.set('jsonPayload', caseWorkPayload);

          // Save the time at which the form is submitted
          const saveSubmissionTime = async () => {
            const submissionTime = Date.now();

            req.sessionModel.set('submitted-at', submissionTime); // Save to session
            try {
              const saveModel = new Model();
              const email = encodeEmail(req.sessionModel.get('user-email'));
              const params = {
                method: 'PATCH',
                url: `${baseUrl}${email}/${reportID}`,
                data: {
                  submitted_at: submissionTime
                }
              };
              req.log('info', `Saving submission time for report ID: ${reportID}`);

              // Save to db
              await saveModel._request(params);
            } catch (e) {
              req.log('error', `Error saving submission time for report ID: ${reportID}: ${e}`);
            }
          };

          // short circuit casework submission
          if (!appConfig.writeToCasework) {
            await saveSubmissionTime();
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
              const errorSubmitting = error ? 'Error Submitting to Queue: ' + error : 'Successful Submission to Queue';
              req.log('info', `External ID: ${externalID}, Report ID: ${reportID},
              Queue Submission Status: ${errorSubmitting}`);

              if (!error) {
                await saveSubmissionTime();
              }

              if (appConfig.audit.enabled) {
                db('hof').insert({
                  ip: (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim(),
                  type: caseworkModel.Type,
                  success: error ? false : true
                }).then(() => {
                  next(error);
                });
              } else {
                next(error);
              }
            });
          }
        } catch (error) {
          req.log('error', `Error saving values: ${error}`);
          next(error);
        }
      });
    }
  };
};
