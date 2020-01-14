'use strict';

const formFields = require('../util/get-all-form-fields');
const dataService = require('modern-slavery-data-service');

/**
 * Get saved form data.
 *
 * This function is required to filter out unwanted session data and return only the saved form values.
 *
 * @param {object} data - the entire data set retirved from the sessionModel
 *
 * @returns {object} -  the saved form values
 */
function getSavedFormData(data) {
  // check if we have any form data saved in the data object, if so return all of them.
  // filter out null values
  const formData = Object.keys(data).map((keyName) => {
    if (formFields.getAllFields().indexOf(keyName) > -1) {
      return {
        [keyName]: data[keyName]
      };
    }

    return null;
  }).filter((arrayElement) => arrayElement);

  return formData;
}

/**
 * Send Data to Data Service
 *
 * @param {object} data - data to be sent to data store
 *
 * @returns {Promise} -  response from data service (the resulting row ID)
 */
const sendDataToBeStored = async(data) => {
  const userEmail = data['user-email'] ? data['user-email'] : 'test@example.com';
  const formData = getSavedFormData(data);
  const visitedPages = data.steps.toString();

  const dataToBeStored = {
    userEmail: userEmail,
    jsonSavedData: formData,
    visitedPages: visitedPages,
  };

  const response = await dataService.write(dataToBeStored);

  if (response && response.rowCount === 1) {
    // get the resulting row ID from the response
    const applicationId = response.rows[0].id;

    return applicationId;
  }
};

/**
 * Read data from data service
 *
 * @param {number} applicationId - the id of the application
 *
 * @returns {Promise} - response from data service (the row data)
 */
const readDataFromStore = async(applicationId) => {
  const response = await dataService.read(applicationId);

  if (response && response.rowCount === 1) {
    return response.rows[0];
  }
};

module.exports = {
  sendDataToBeStored: sendDataToBeStored,
  readDataFromStore: readDataFromStore,
};
