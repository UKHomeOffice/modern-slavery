'use strict';
const saveAndExitService = require('../services/save-and-exit-service');

/**
 * Save data to database
 *
 * @param {object} data - request object
 *
 * @returns {Promise}
 */
const saveData = async(data) => {
  return await saveAndExitService.write(data);
};


/**
 * Get Session data
 *
 * @param {object} req - request object
 *
 * @returns {object} - the session data in the request object
 */
const getSessionData = (req) => {
  const sessionData = req.sessionModel.toJSON();

  return sessionData;
};

/**
 * Save application progress
 *
 * Get the application data from the session then persist the data
 * within a database
 *
 * @param {object} req - request object
 *
 * @returns {Promise} - id returned from saved application
 */
const saveApplication = async(req) => {
  const sessionData = getSessionData(req);
  return await saveData(sessionData);
};

module.exports = superclass => class extends superclass {
  async saveValues(req, res) {
    try {
      const applicationId = await saveApplication(req);
      // save resulting id to session
      req.sessionModel.set('application-id', applicationId);

      return res.redirect('/nrm/application-saved');
    } catch (err) {
      return res.redirect('/nrm/application-not-saved');
    }
  }
};

