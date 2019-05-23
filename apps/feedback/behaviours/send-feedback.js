/* eslint-disable no-console */
'use strict';

const config = require('../../../config');
const feedbackEmail = config.govukNotify.feedbackEmail;
const util = require('../util/send-email');

/**
 * Get Feedback Data
 *
 * @param {object} req - request object
 *
 * @returns {object} - feedback data
 */
const getFeedbackData = (req) => {
  const feedbackRating = req.sessionModel.feedback;
  const feedbackMessage = req.sessionModel.improvements;

  const data = {
    rating: feedbackRating,
    message: feedbackMessage,
  };

  return data;
};

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    const data = getFeedbackData(req);

    try {
      await util.sendEmail(feedbackEmail, data);
    } catch (err) {
      console.error(err);
    }

    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
