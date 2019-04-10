'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/reported-to-police';
    } else if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes') {
      backLink = '/nrm/does-pv-need-support';
    } else {
      backLink = '/nrm/co-operate-with-police';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes') {
      nextStep = '/nrm/pv-dob';
    } else {
      nextStep = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  }
};
