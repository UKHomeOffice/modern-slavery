'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    backLink = '/nrm/reported-to-police';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/refuse-nrm';
    } else {
      nextStep = '/nrm/does-pv-need-support';
    }

    return nextStep;
  }

};
