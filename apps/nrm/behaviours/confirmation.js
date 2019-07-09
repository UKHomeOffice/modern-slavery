'use strict';

/**
 * Fomrat heading text based on user journey ( NRM or Duty to Notify)
 *
 * @param {Object} req - request object
 *
 * @returns {Object} - formatted data for display on UI
 */
const formatHeading = (req) => {
  let data = {};
  let headingMessage = 'NRM referral sent';

  if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
    headingMessage = 'Duty to Notify (DtN) sent';
  }

  data = Object.assign({}, data, {
    confirmationHeading: headingMessage,
  });

  return data;
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, formatHeading(req));
    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
