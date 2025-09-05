/* eslint-disable max-len  */
'use strict';
const { model: Model } = require('hof');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, async err => {
      if (err) {
        next(err);
      }

      // Before deleting the report, we need to ensure that the submission time matches the one stored in the session.
      // This prevents deletions of reports when the submission has gone wrong.
      try {
        const model = new Model();
        const reportUrl = `${config.saveService.host}:${config.saveService.port}/reports/${encodeEmail(req.sessionModel.get('user-email'))}/${req.sessionModel.get('id')}`;

        // Get submission time from session
        const sessionSubmissionTime = String(req.sessionModel.get('submitted-at'));

        // Ger submission time from the db
        const getParams = {
          url: reportUrl,
          method: 'GET'
        };

        const response = await model._request(getParams);
        const resBody = response.data;

        let dbSubmissionTime = null;

        if (resBody && resBody.length && resBody[0].submitted_at) {
          dbSubmissionTime = String(resBody[0].submitted_at);
        }

        // Compare the submission times and only delete if they match
        if(dbSubmissionTime && dbSubmissionTime === sessionSubmissionTime) {
          const delParams = {
            url: reportUrl,
            method: 'DELETE'
          };
          await model._request(delParams);
          return next();
        }

        throw new Error(`Submission time mismatch: ${dbSubmissionTime} does not match ${sessionSubmissionTime}`);
      } catch (error) {
        logger.error(`Error deleting data: ${error.message}`);
        return next(error);
      }
    });
  }
};
