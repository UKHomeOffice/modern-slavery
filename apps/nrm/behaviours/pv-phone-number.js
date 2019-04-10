'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('who-contact') === 'someone-else') {
      backLink = '/nrm/someone-else';
    } else {
      backLink = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }
};
