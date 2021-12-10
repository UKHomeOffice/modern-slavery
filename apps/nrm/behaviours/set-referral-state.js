'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const pvUnderAge = req.form.values['pv-under-age'] !== 'no';
    const currentSteps = req.sessionModel.get('steps');
    const previouslyAnsweredSubmitToNRM = currentSteps.includes('/pv-want-to-submit-nrm');
    const formSteps = Object.keys(req.form.options.steps);

    const stepsBeforeReferralQuestion = formSteps.slice(0, formSteps.indexOf('/pv-want-to-submit-nrm') + 1);

    req.sessionModel.set('automatic-referral', pvUnderAge);

    if (pvUnderAge) {
      const filteredSteps = currentSteps.filter(step => stepsBeforeReferralQuestion.includes(step));
      req.sessionModel.set('pv-want-to-submit-nrm', 'yes');
      req.sessionModel.set('is-referral', true);
      req.sessionModel.set('steps', filteredSteps);
      req.sessionModel.unset('does-pv-need-support');
    } else if (!previouslyAnsweredSubmitToNRM) {
      req.sessionModel.unset('pv-want-to-submit-nrm');
      req.sessionModel.unset('is-referral');
    }

    return super.saveValues(req, res, next);
  }
};
