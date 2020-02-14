'use strict';

const getReportService = require('../models/read-saved-report-data');

/**
 * Set session data
 *
 * This function is used in order to pre-populate the report with previously saved values.
 *
 * We loop through all the jsonSavedData and insert them into the current session
 *
 * @param {object} req - request object
 * @param {object} data - data object containing report data
 */
const setSessionData = (req, data) => {
  Object.keys(data).forEach((element) => {
    req.sessionModel.set(`${element}`, data[`${element}`]);
  });
};

/**
 * Get report from data service
 *
 * Retrieve the user email from the app and then pass it on to the data service in
 * order to obtain the reports the user has saved.
 *
 * @param {*} req - request object
 *
 * @returns {Promise} - response from data service
 */
const getReports = async(req) => {
  // get user email
  const userEmail = req.sessionModel.get('user-email');

  try {
    const savedData = await getReportService(userEmail);

    // Check the user has an report
    if (savedData) {
      // set the session data with previously saved data
      setSessionData(req, savedData);

      // This proves data has been retrieved from the data store
      req.sessionModel.set('report-read-success', savedData);
      req.sessionModel.unset('no-report-found');
      req.sessionModel.unset('report-read-error');
    } else {
      // This proves data has been retrieved but no report was found
      req.sessionModel.set('no-report-found');
      req.sessionModel.unset('report-read-success');
      req.sessionModel.unset('report-read-error');
    }
  } catch (err) {
    // There was a problem reading the data
    req.sessionModel.unset('report-read-success');
    req.sessionModel.unset('no-report-found');
    req.sessionModel.set('report-read-error', err);
  }
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    // attempt to read a saved report data using a data service
    await getReports(req);

    super.getValues(req, res, next);
  }
};
