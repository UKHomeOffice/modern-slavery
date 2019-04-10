'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-nationality';
    } else if (req.sessionModel.get('does-pv-need-support') === 'yes') {
      backLink = '/nrm/pv-phone-number';
    } else if (req.sessionModel.get('who-contact') === 'someone-else') {
      backLink = '/nrm/someone-else';
    } else {
      backLink = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes') {
      nextStep = '/nrm/fr-details';
    } else if (req.sessionModel.get('co-operate-with-police') === 'no') {
      nextStep = '/nrm/confirm';
    } else {
      nextStep = '/nrm/pv-name';
    }

    if (
      req.params &&
      req.params.action &&
      req.params.action === 'edit' &&
      nextStep !== '/nrm/confirm' &&
      nextStep !== '/nrm/fr-details'
      ) {
      nextStep += '/edit';
    }

    return nextStep;

  }
};
