'use strict';

const dataService = require('./data-service');
const {
  makeRequest,
  requestHeaders,
  } = dataService;
const formFields = require('../util/get-all-form-fields');

/**
 * Get saved form data.
 *
 * This function is required to filter out unwanted session data and return only the saved form values.
 *
 * @param {object} data - the entire data set retirved from the sessionModel
 *
 * @returns {string} -  the saved form values in string format
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

  return JSON.stringify(formData);
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

  const dateObject = new Date();
  const currentDateTime = dateObject.toISOString();

  const body = {
    'user_email': userEmail,
    'json_saved_data': formData,
    'visited_pages': visitedPages,
    'createdAt': currentDateTime,
  };

  const options = {
    method: 'post',
    body: JSON.stringify(body),
    headers: requestHeaders,
  };

  const response = await makeRequest('/reports', options);

  const reportId = response ? response.rows[0].id : null;

  return reportId;
};

module.exports = sendDataToBeStored;
