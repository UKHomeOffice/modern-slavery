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

/**
 * Get local page data
 *
 * We need to feedback to the user the outcome of the read
 * request. So we check the sessionModel variable 'report-read-success'
 * to determine whether the request was successful.
 *
 * @const reportSaved - if true then user is sent to page and will see
 * content related to a sucessful read from their list of reports.
 *
 * @param {object} req - request object
 *
 * @returns {object} - containing the outcome report
 * save process
 */
const getLocalPageData = (req) => {
  let reportsRequestStatus = {
    reportSaved: false,
  };

  if (req.sessionModel.get('report-read-success')) {
    reportsRequestStatus.reportSaved = true;
  }

  if (req.sessionModel.get('no-report-found')) {
    return {
      reportsNotFound: true,
    };
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
    Dependant on the outcome of the getReports() request */
    let data = getLocalPageData(req);

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
