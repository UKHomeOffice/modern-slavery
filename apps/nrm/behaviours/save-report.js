'use strict';

const saveReportService = null;

/**
 * Save report progress
 *
 * Get the report data from the session then attempt to save
 * it to a data store by sending it to a service.
 *
 * In case the data is not saved to the data store; we need the
 * ability to feedback to the user whether the save process was
 * successful. Setting the variable 'report-id' in the
 * sessionModel will enable us to do that.
 *
 * We want to set the variable 'report-save-error' in the
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
const saveReport = async(req) => {
  // get report data
  const sessionData = req.sessionModel.toJSON();

  try {
    const response = await saveReportService(sessionData);

    // This proves data has been saved to the data store
    req.sessionModel.set('report-id', response);
    req.sessionModel.unset('report-save-error');
  } catch (err) {
    // There was a problem saving the data
    req.sessionModel.unset('report-id');
    req.sessionModel.set('report-save-error', err);
  }
};

/**
 * Get local page data
 *
 * We need to feedback to the user the outcome of the save
 * request. So we check the sessionModel variable 'report-id'
 * to determine whether the request was successful.
 *
 * @const reportSavedSuccessfully - if sent to page then the
 * user will see content related to a sucessfully saved report.
 *
 * @const reportNotSaved -  if sent to the page then the user
 * will see content relating to an failure in the save request.
 *
 * @param {object} req - request object
 *
 * @returns {object} - containing the outcome report
 * save process
 */
const getLocalPageData = (req) => {
  let reportSaveStatus = {
    reportSaved: false,
  };

  if (req.sessionModel.get('report-id')) {
    reportSaveStatus.reportSaved = true;
  }

  return reportSaveStatus;
};

module.exports = superclass => class extends superclass {
  async getValues(req, res, next) {
    // attempt to save report data using a data service
    await saveReport(req);

    super.getValues(req, res, next);
  }

  locals(req, res) {
    const superlocals = super.locals(req, res);

    /* Get relevant content to show on the page.
    Dependant on the outcome of the saveReport() request */
    let data = getLocalPageData(req);

    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
