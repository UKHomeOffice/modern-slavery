/* eslint-disable consistent-return */
'use strict';

const appConfig = require('../../../config');
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
      super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }

        const caseWorkPayload = appConfig.writeToCasework ? config.prepare(req.sessionModel.toJSON()) :
          { info: 'No submission was made to icasework' };

        const externalID = req.sessionModel.get('externalID')  || caseWorkPayload.ExternalId;

        const reportReference = req.sessionModel.get('reference');

        req.sessionModel.set('jsonPayload', caseWorkPayload);

        // short circuit casework submission
        if (!appConfig.writeToCasework) {
          next();
        } else {
          // send casework model to AWS SQS
          const caseworkModel = config.prepare(req.sessionModel.toJSON());
          const caseworkID = uuid();
          req.log('info', `External ID: ${externalID}, Report Reference: ${reportReference},
            Submitting Case to Queue Case ID: ${caseworkID}`);
          producer.send([{
            id: caseworkID,
            body: JSON.stringify(caseworkModel)
          }], error => {
            const errorSubmitting = error ? 'Error Submitting to Queue: ' + error : 'Successful Submission to Queue';
            req.log('info', `External ID: ${externalID}, Queue Submission Status: ${errorSubmitting}`);
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
      });
    }
  };
};
