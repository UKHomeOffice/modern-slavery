'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/fr-location/edit';
    } else {
      backLink = '/nrm/pv-under-age';
    }

    return backLink;
  }
};
