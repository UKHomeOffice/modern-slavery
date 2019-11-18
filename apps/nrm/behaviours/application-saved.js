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

/**
 * Check if application has been saved successfully
 *
 * If the 'application-id' has been set then an application has been
 * saved successfully
 *
 * @param {object} req - request object
 *
 * @returns {bool} - has the application been saved
 */
const isApplicationSaved = (req) => {
  if (req.sessionModel.get('application-id')) {
    return true;
  }
  return false;
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    try {
      const applicationId = await saveApplication(req);
      // save resulting id to session
      req.sessionModel.set('application-id', applicationId);
      req.sessionModel.unset('application-save-error');
      super.getValues(req, res, next);
    } catch (err) {
      req.sessionModel.unset('application-id');
      req.sessionModel.set('application-save-error', err);
      super.getValues(req, res, next);
    }
  }

  locals(req, res) {
    const superlocals = super.locals(req, res);

    let data;

    // set locals to determine which content to show
    if (isApplicationSaved(req)) {
      data = Object.assign({}, data, {
        applicationSavedSuccessfully: true,
      });
    } else {
      data = Object.assign({}, data, {
        applicationNotSaved: true,
      });
    }

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }

};
