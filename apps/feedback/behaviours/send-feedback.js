/* eslint-disable no-console */
'use strict';

const config = require('../../../config');
const feedbackEmail = config.govukNotify.feedbackEmail;
const util = require('../util/send-email');
const formatter = require('../util/data-formatter');
const { capitaliseText, removeDashesFromText } = formatter;

/**
 * Get Feedback Data
 *
 * @param {object} req - request object
 *
 * @returns {object} - feedback data
 */
const getFeedbackData = (req) => {
  const feedbackRating = capitaliseText(removeDashesFromText(req.body.feedback));
  const feedbackMessage = req.body.improvements;

  const feedbackReplyEmail = req.body.email;

  const data = {
    rating: feedbackRating,
    message: feedbackMessage,
    email: feedbackReplyEmail,
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
