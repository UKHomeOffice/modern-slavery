'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-gender';
    } else {
      backLink = '/nrm/does-pv-have-children';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }

  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-interpreter-requirements';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  }
};
