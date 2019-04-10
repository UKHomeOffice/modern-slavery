'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-name';
    } else {
      backLink = '/nrm/who-contact';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/confirm';
    } else if (req.sessionModel.get('does-pv-need-support') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-phone-number';
    }

    if (req.params && req.params.action && req.params.action === 'edit' && nextStep !== 'confirm') {
      nextStep += '/edit';
    }

    return nextStep;
  }
};
