'use strict';

const appConfig = require('../../../config');
const Producer = require('sqs-producer');
const uuid = require('uuid/v4');

module.exports = config => {

  config = config || {};
  let producer;

  if (appConfig.writeToCasework) {
    producer = Producer.create({
      queueUrl: appConfig.aws.sqs,
      region: 'eu-west-2'
    });
  }

  return superclass => class extends superclass {

    saveValues(req, res, next) {
      req.log('debug', 'Submitting case to message queue');
      super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }
        let caseWorkPayload = appConfig.writeToCasework ? config.prepare(req.sessionModel.toJSON()) :
          { info: 'No submission was made to icasework' };

        req.sessionModel.set('jsonPayload', caseWorkPayload);

        // short circuit casework submission
        if (!appConfig.writeToCasework) {
          next();
        } else {
          // send casework model to AWS SQS
          producer.send([{
              id: uuid(),
              body: JSON.stringify(config.prepare(req.sessionModel.toJSON()))
          }], error => {
            if (error) {
              next(error);
            }
            next();
          });
        }
      });
    }

  };

};
