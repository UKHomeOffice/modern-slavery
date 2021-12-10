'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const pvUnderAge = req.form.values['pv-under-age'] !== 'no';
    
    req.sessionModel.set('automatic-referral', pvUnderAge);

    return super.saveValues(req, res, next);
  }
};
