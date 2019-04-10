'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/pv-ho-reference';
    } else {
      backLink = '/nrm/co-operate-with-police';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  }
};
