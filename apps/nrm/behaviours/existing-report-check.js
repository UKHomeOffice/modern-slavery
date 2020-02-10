'use strict';

/**
 * Check if user has an selected that they have an application saved
 *
 * @param {object} req - request object
 *
 * @returns {bool} - if the user wants to check if they have an application saved
 */
function checkForSavedApplication(req) {
  const checkRequested = req.sessionModel.get('existing-report-check') === 'yes';

  return checkRequested;
}

module.exports = superclass => class extends superclass {
  getNextStep(req, res) {
    let nextStep = super.getNextStep(req, res);

    nextStep = checkForSavedApplication(req) ? '/nrm/enter-your-email' : '/nrm/fr-location';

    return nextStep;
  }
};
