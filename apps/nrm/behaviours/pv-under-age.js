'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-under-age') === 'no') {
      backLink = '/nrm/local-authority-contacted-about-child';
    } else {
      backLink = '/pv-under-age-at-time-of-exploitation';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      nextStep = '/nrm/local-authority-contacted-about-child';
    } else {
      nextStep = '/nrm/pv-under-age-at-time-of-exploitation';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  }
};
