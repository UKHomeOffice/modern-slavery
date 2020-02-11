'use strict';

const saveAndExitService = require('../models/saved-data');

/**
 * Get the specified application from the data service
 *
 * @param {number} userEmail - user email
 *
 * @returns {Promise} - response from data service
 */
const getData = async(userEmail) => {
  return await saveAndExitService.readDataFromStore(userEmail);
};

/**
 * Set session data
 *
 * This function is used in order to pre-populate the application with previously saved values.
 *
 * We loop through all the jsonSavedData and insert them into the current session
 *
 * @param {*} req - request object
 */
const setSessionData = (req, data) => {
  Object.keys(data).forEach((element) => {
    req.sessionModel.set(`${element}`, data[`${element}`]);
  });
};

/**
 * Get application from data service
 *
 * Retrieve the user email from the app and then pass it on to the data service in
 * order to obtain the applications the user has saved.
 *
 * @param {*} req - request object
 *
 * @returns {Promise} - response from data service
 */
const getApplications = async(req) => {
  // get user email
  const userEmail = req.sessionModel.get('user-email');

  try {
    const applicationsArrayList = await getData(userEmail);

    // Check the user has an application
    if (applicationsArrayList.length > 0) {
      // get latest appplication
      const latestApplication = applicationsArrayList[0];

      const savedData = JSON.parse(latestApplication);

      // set the session data with previously saved data
      setSessionData(req, savedData);

      // This proves data has been retrieved from the data store
      req.sessionModel.set('application-read-success', savedData);
      req.sessionModel.unset('no-application-found');
      req.sessionModel.unset('application-read-error');
    } else {
      // This proves data has been retrived but no application
      req.sessionModel.set('no-application-found');
      req.sessionModel.unset('application-read-success');
      req.sessionModel.unset('application-read-error');
    }
  } catch (err) {
    // There was a problem reading the data
    req.sessionModel.unset('application-read-success');
    req.sessionModel.unset('no-application-found');
    req.sessionModel.set('application-read-error', err);
  }
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    // attempt to save application data using a data service
    await getApplications(req);

    super.getValues(req, res, next);
  }
};
