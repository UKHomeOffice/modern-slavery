'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const pvUnderAge = req.form.values['pv-under-age'] !== 'no';
    const currentSteps = req.sessionModel.get('steps');
    const previouslyAnsweredSubmitToNRM = currentSteps.includes('/pv-want-to-submit-nrm');

    req.sessionModel.set('automatic-referral', pvUnderAge);

    if (pvUnderAge) {
      req.sessionModel.set('pv-want-to-submit-nrm', 'yes');
      req.sessionModel.set('is-referral', true);
      req.sessionModel.unset('does-pv-need-support');
    } else if (!previouslyAnsweredSubmitToNRM) {
      req.sessionModel.unset('pv-want-to-submit-nrm');
      req.sessionModel.unset('is-referral');
    }

    return super.saveValues(req, res, next);
  }
};
