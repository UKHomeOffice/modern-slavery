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
      setSessionData(req, JSON.parse(savedData.json_saved_data));

      // This proves data has been retrieved from the data store
      req.sessionModel.set('report-read-success', savedData);
    } else {
      req.sessionModel.unset('report-read-success');
    }
  } catch (err) {
    // There was a problem reading the data
    req.sessionModel.unset('report-read-success');
  }
};

/**
 * Get local page data
 *
 * We need to feedback to the user the outcome of the read
 * request. So we check the sessionModel variable 'report-read-success'
 * to determine whether the request was successful.
 *
 * @const reportsRequestStatus - if true or false then user is sent to page and will see
 * content related to a sucessful / failed read from their list of reports.
 *
 * Otherwise an object declaring that no records were found will be sent
 *
 * @param {object} req - request object
 *
 * @returns {object} - containing the outcome report
 * save process
 */
const getLocalPageData = (req) => {
  let reportsRequestStatus = {};

  if (req.sessionModel.get('report-read-success')) {
      reportsRequestStatus.hasReports = true;
  }

  return reportsRequestStatus;
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    // attempt to read a saved report data using a data service
    await getReports(req);

    super.getValues(req, res, next);
  }

  locals(req, res) {
    const superlocals = super.locals(req, res);

    /* Get relevant content to show on the page.
    Dependent on the outcome of the getReports() request */
    let data = getLocalPageData(req);

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
