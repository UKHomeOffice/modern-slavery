'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    } else {
      backLink = '/nrm/fr-location';
    }

    if (req.params && req.params.action && req.params.action === 'edit' && backLink !== 'confirm') {
      backLink += '/edit';
    }

    return backLink;
  }
};
