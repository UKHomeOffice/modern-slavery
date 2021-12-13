'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.sessionModel.get('automatic-referral')) {
      delete req.form.options.fields['pv-want-to-submit-nrm'].validate;
    }
    next();
  }

  saveValues(req, res, next) {
    const currentSteps = req.sessionModel.get('steps');
    const formSteps = Object.keys(req.form.options.steps);
    const stepsBeforeReferralQuestion = formSteps.slice(0, formSteps.indexOf('/pv-want-to-submit-nrm') + 1);
    const filteredSteps = currentSteps.filter(step => stepsBeforeReferralQuestion.includes(step));

    req.sessionModel.set('steps', filteredSteps);

    if (req.sessionModel.get('automatic-referral')) {
      req.form.values['pv-want-to-submit-nrm'] = 'yes';
    }

    const isReferral = req.form.values['pv-want-to-submit-nrm'] === 'yes';

    req.sessionModel.set('is-referral', isReferral);

    return super.saveValues(req, res, next);
  }
};
