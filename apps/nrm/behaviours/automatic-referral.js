'use strict';
const { updateAutomaticReferral } = require('../util/update-auto-referral');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    updateAutomaticReferral(req, req.form.values['pv-under-age']);
    return super.saveValues(req, res, next);
  }

  getValues(req, res, next) {
    updateAutomaticReferral(req, req.sessionModel.get('pv-under-age'));
    return super.getValues(req, res, next);
  }
};
