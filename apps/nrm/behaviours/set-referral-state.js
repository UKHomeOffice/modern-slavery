'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const pvUnderAge = req.form.values['pv-under-age'] !== 'no';

    req.sessionModel.set('automatic-referral', pvUnderAge);

    if (pvUnderAge) {
      req.sessionModel.set('pv-want-to-submit-nrm', 'yes');
      req.sessionModel.unset('does-pv-need-support');
    }

    return super.saveValues(req, res, next);
  }
};
