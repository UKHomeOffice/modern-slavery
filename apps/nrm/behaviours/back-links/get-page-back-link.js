'use strict';
const pageCustomBackLinks = require('./page-custom-back-links');

/**
 * Get Custom Back link for specified page
 *
 * @param {Object} req - request parameters
 * @param {string} pageName - name of the page
 *
 * @returns {string} - the back link string of the url to be directed to.
 */
const getPageBackLink = (req, pageName) => {
  const pageBackLinks = {
    'co-operate-with-police': pageCustomBackLinks.coOperateWithPolice(req),
    'does-pv-have-children': pageCustomBackLinks.doesPvHaveChildren(req),
    'does-pv-need-support': pageCustomBackLinks.doesPvNeedSupport(req),
    'fr-alternative-contact': pageCustomBackLinks.frAlternativeContact(req),
    'pv-contact-details': pageCustomBackLinks.pvContactDetails(req),
    'pv-dob': pageCustomBackLinks.pvDob(req),
    'pv-gender': pageCustomBackLinks.pvGender(req),
    'pv-ho-reference': pageCustomBackLinks.pvHoReference(req),
    'pv-interpreter-requirements': pageCustomBackLinks.pvInterpreterRequirements(req),
    'pv-name': pageCustomBackLinks.pvName(req),
    'pv-nationality': pageCustomBackLinks.pvNationality(req),
    'pv-phone-number': pageCustomBackLinks.pvPhoneNumber(req),
    'pv-under-age-at-time-of-exploitation': pageCustomBackLinks.pvUnderAgeAtTimeOfExploitation(req),
    'pv-want-to-submit-nrm': pageCustomBackLinks.pvWantToSubmitNrm(req),
    'refuse-nrm': pageCustomBackLinks.refuseNrm(req),
    'reported-to-police': pageCustomBackLinks.reportedToPolice(req),
    'someone-else': pageCustomBackLinks.someoneElse(req),
    'what-happened': pageCustomBackLinks.whatHappened(req),
    'who-contact': pageCustomBackLinks.whoContact(req),
    confirm: pageCustomBackLinks.confirm(req),
    'fr-details': pageCustomBackLinks.frDetails(req),
    'local-authority-contacted-about-child': pageCustomBackLinks.localAuthorityContactedAboutChild(req),
    'where-exploitation-happened': pageCustomBackLinks.whereExploitationHappened(req),
    'where-exploitation-happened-uk': pageCustomBackLinks.whereExploitationHappenedUk(req),
    'where-exploitation-happened-overseas': pageCustomBackLinks.whereExploitationHappenedOverseas(req),
    'current-pv-location': pageCustomBackLinks.currentPvLocation(req)
  };

  return pageBackLinks[pageName];
};

module.exports = pageName => {
  return superclass => class extends superclass {
    getBackLink(req, res) {
      let backLink = super.getBackLink(req, res);

      // default behaviour when editing page is to return to CYA page
      if (pageName !== 'default') {
        backLink = getPageBackLink(req, pageName);
      } else if (req.params && req.params.action && req.params.action === 'edit') {
        backLink = '/nrm/confirm';
      }

      return backLink;
    }
  };
};
