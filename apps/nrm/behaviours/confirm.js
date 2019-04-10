'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes' || req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/fr-alternative-contact/edit';
    } else if (req.sessionModel.get('co-operate-with-police') === 'yes') {
      backLink = '/nrm/pv-contact-details/edit';
    } else {
      backLink = '/nrm/co-operate-with-police/edit';
    }

    return backLink;
  }
};
