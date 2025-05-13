/* eslint-disable consistent-return, max-len */
'use strict';

const appConfig = require('../../../config');
const GetFileToken = require('../models/file-upload');
const Producer = require('sqs-producer');
const uuid = require('uuid/v4');
let db;

if (appConfig.audit.enabled) {
  db = require('./../../common/db');
}

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
            next();
          } else {
            // send casework model to AWS SQS
            const caseworkModel = config.prepare(req.sessionModel.toJSON(), token);
            const caseworkID = uuid();
            const submittedAt = req.sessionModel.set('submitted_at', Date.now());
            req.log('info', `External ID: ${externalID}, Report ID: ${reportID},
            Submitting Case to Queue Case ID: ${caseworkID}`);
            producer.send([{
              id: caseworkID,
              body: JSON.stringify(caseworkModel)
            }], error => {
              const errorSubmitting = error ? 'Error Submitting to Queue: ' + error : `Successful Submission to Queue at ${submittedAt}`;
              req.log('info', `External ID: ${externalID}, Report ID: ${reportID},
              Queue Submission Status: ${errorSubmitting}`);
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
          req.log('error', `Error submitting case: ${error}`);
          next(error);
        }
      });
    }
  };
};
