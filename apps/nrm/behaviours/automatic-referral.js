'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    if (req.sessionModel.get('automatic-referral')) {
      req.sessionModel.set('pv-want-to-submit-nrm', 'yes');
    }
    return super.saveValues(req, res, next);
  }
};
