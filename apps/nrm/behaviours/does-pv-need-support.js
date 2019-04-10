'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    backLink = '/nrm/pv-want-to-submit-nrm';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    nextStep = '/nrm/pv-name';

    return nextStep;
  }

};
