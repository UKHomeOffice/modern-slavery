'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const currentSteps = req.sessionModel.get('steps');
    const formSteps = Object.keys(req.form.options.steps);
    const stepsBeforeReferralQuestion = formSteps.slice(0, formSteps.indexOf('/pv-want-to-submit-nrm') + 1);
    const filteredSteps = currentSteps.filter(step => stepsBeforeReferralQuestion.includes(step));

    const externalID = req.sessionModel.get('externalID');
    req.log('info', `External ID: ${externalID}, Journey Reset`);

    req.sessionModel.set('steps', filteredSteps);

    return super.saveValues(req, res, next);
  }
};
