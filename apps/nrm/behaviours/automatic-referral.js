'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.sessionModel.get('automatic-referral')) {
      delete req.form.options.fields['pv-want-to-submit-nrm'].validate;
    }
    next();
  }

  saveValues(req, res, next) {
    if (req.sessionModel.get('automatic-referral')) {
      req.form.values['pv-want-to-submit-nrm'] = 'yes';
    }
    const isReferral = req.form.values['pv-want-to-submit-nrm'] === 'yes';

    req.sessionModel.set('is-referral', isReferral);

    return super.saveValues(req, res, next);
  };
};
