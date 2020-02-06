'use strict';
const saveAndExitService = require('../models/saved-data');

/**
 * Send the data to a service that will save it to a
 * data store
 *
 * @param {object} data - request object
 *
 * @returns {Promise} - response from data service
 */
const saveData = async(data) => {
  return await saveAndExitService.sendDataToBeStored(data);
};

/**
 * Save application process
 *
 * Get the application data from the session then attempt to save
 * it to a data store by sending it to a service.
 *
 * In case the data is not saved to the data store; we need the
 * ability to feedback to the user whether the save process was
 * successful. Setting the variable 'application-id' in the
 * sessionModel will enable us to do that.
 *
 * We want to set the variable 'application-save-error' in the
 * sessionModel so that we can display an error page with contents
 * of the error message.
 *
 * The reason we unset either of the two variables is because the
 * user has the ability to go back and make multiple submissions.
 * In case the outcome of the submission is different on each
 * save attempt; it ensures that the user will be presented with
 * the correct content.
 *
 * @param {object} req - request object
 *
 * @returns {Promise} - response from data service
 */
const saveApplication = async(req) => {
  // get application data
  const sessionData = req.sessionModel.toJSON();

  try {
    const response = await saveData(sessionData);
    const applicationId = response.rows[0].id;

    // This proves data has been saved to the data store
    req.sessionModel.set('application-id', applicationId);
    req.sessionModel.unset('application-save-error');
  } catch (err) {
    // There was a problem saving the data
    req.sessionModel.unset('application-id');
    req.sessionModel.set('application-save-error', err);
  }
};

/**
 * Get local page data
 *
 * We need to feedback to the user the outcome of the save
 * request. So we check the sessionModel variable 'application-id'
 * to determine whether the request was successful.
 *
 * @const applicationSavedSuccessfully - if sent to page then the
 * user will see content related to a sucessfully saved application.
 *
 * @const applicationNotSaved -  if sent to the page then the user
 * will see content relating to an failure in the save request.
 *
 * @param {object} req - request object
 *
 * @returns {object} - containing the outcome application
 * save process
 */
const getLocalPageData = (req) => {
  const applicationSavedSuccessfully = {
    applicationSavedSuccessfully: true,
  };

  const applicationNotSaved = {
    applicationNotSaved: true,
  };

  if (req.sessionModel.get('application-id')) {
    return applicationSavedSuccessfully;
  }

  return applicationNotSaved;
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    // attempt to save application data using a data service
    await saveApplication(req);

    super.getValues(req, res, next);
  }

  locals(req, res) {
    const superlocals = super.locals(req, res);

    /* Get relevant content to show on the page.
    Dependant on the outcome of the saveApplication() request */
    let data = getLocalPageData(req);

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }

};
