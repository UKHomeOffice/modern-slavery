'use strict';
const pageCustomNextSteps = require('./page-custom-next-steps');

/**
 * Get Custom Next step for specified page
 *
 * @param {Object} req - request parameters
 * @param {string} pageName - name of the page
 *
 * @returns {string} - the next step string of the url to be directed to.
 */
const getPageNextStep = (req, pageName) => {
  const pageNextSteps = {
    'co-operate-with-police': pageCustomNextSteps.coOperateWithPolice(req),
    'does-pv-have-children': pageCustomNextSteps.doesPvHaveChildren(req),
    'does-pv-need-support': pageCustomNextSteps.doesPvNeedSupport(),
    'fr-alternative-contact': pageCustomNextSteps.frAlternativeContact(),
    'pv-contact-details': pageCustomNextSteps.pvContactDetails(req),
    'pv-gender': pageCustomNextSteps.pvGender(req),
    'pv-ho-reference': pageCustomNextSteps.pvHoReference(req),
    'pv-name': pageCustomNextSteps.pvName(req),
    'pv-nationality': pageCustomNextSteps.pvNationality(req),
    'pv-under-age': pageCustomNextSteps.pvUnderAge(req),
    'pv-want-to-submit-nrm': pageCustomNextSteps.pvWantToSubmitNrm(req),
    'reported-to-police': pageCustomNextSteps.reportedToPolice(req),
    'someone-else': pageCustomNextSteps.someoneElse(req),
    'who-contact': pageCustomNextSteps.whoContact(req),
    'where-exploitation-happened': pageCustomNextSteps.whereExploitationHappened(req),
    'where-exploitation-happened-uk': pageCustomNextSteps.whereExploitationHappenedUk(req),
    'where-exploitation-happened-overseas': pageCustomNextSteps.whereExploitationHappenedOverseas(req),
    'check-your-answers-so-far': pageCustomNextSteps.checkYourAnswersSoFar(req),
  };

  return pageNextSteps[pageName];
};

module.exports = pageName => {
  return superclass => class extends superclass {
    getNextStep(req, res) {
      let nextStep = super.getNextStep(req, res);

      nextStep = getPageNextStep(req, pageName);

      return nextStep;
    }
  };
};
