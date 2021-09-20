'use strict';

/**
 * Check if user has folllowed the happy path
 *
 * @param {Object} req - request parameters
 *
 * @returns {bool} - has the user followed the adult path
 */
const isAdultPath = req => {
  return (
    req.sessionModel.get('pv-under-age') === 'no' &&
    req.sessionModel.get('pv-want-to-submit-nrm') === 'yes'
  );
};

/**
 * Check if user has folllowed the duty to notify path
 *
 * @param {Object} req - request parameters
 *
 * @returns {bool} - has the user followed the duty to notify path
 */
const isDutyToNotifyPath = req => {
  return (
    req.sessionModel.get('pv-under-age') === 'no' &&
    req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
  );
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);

    let data = {};

    if (isAdultPath(req)) {
      if (req.sessionModel.get('who-contact') === 'someone-else') {
        data = Object.assign({}, data, {showSomeoneElsesContactDetails: true});
      } else {
        data = Object.assign({}, data, {showContactDetails: true});
      }

      if (req.sessionModel.get('does-pv-need-support') === 'yes') {
        data = Object.assign({}, data, {showPvPhoneNumber: true});
        if (req.sessionModel.get('pv-phone-number') === 'no') {
          data = Object.assign({}, data, {showPvPhoneNumberNoOption: true});
        }
      }
    } else if (isDutyToNotifyPath(req)) {
      if (req.sessionModel.get('co-operate-with-police') === 'yes') {
        const additionalData = {
          isDutyToNotifyPath: true,
          showContactDetails: true
        };
        data = Object.assign({}, data, additionalData);
      } else {
        data = Object.assign({}, data, {isDutyToNotifyPath: true});
      }
    }

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
