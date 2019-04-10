'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    backLink = '/nrm/who-contact';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('does-pv-need-support') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-phone-number';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  }

};
