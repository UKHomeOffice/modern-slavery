'use strict';
const fetch = require('node-fetch');
const base64 = require('base-64');

const formFields = require('../util/get-all-form-fields');
const dataService = require('../../../config').dataService;
const {
  url: dataServiceUrl,
  login,
  password,
} = dataService;

const dataServiceRequestheaders = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${base64.encode(`${login}:${password}`)}`
};

/**
 * Make request to data service API endpoint
 *
 * @param {string} uri - endpoint URI
 * @param {object} options - request options (e.g. method, body and headers)
 *
 * @returns {Promise} - promise obejct containing the response
 */
async function makeRequest(uri, options) {
  const response = await fetch(`${dataServiceUrl}/${uri}`, options);

  return response.json();
}

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

  const body = {
    'user_email': userEmail,
    'json_saved_data': formData,
    'visited_pages': visitedPages,
  };

  const options = {
    method: 'post',
    body: JSON.stringify(body),
    headers: dataServiceRequestheaders,
  };

  const response = await makeRequest('/reports', options);

  return response;
};

/**
 * Read data from data service
 *
 * @param {number} userEmail - the user email
 *
 * @returns {Promise} - response from data service (the row data)
 */
const readDataFromStore = async(userEmail) => {
  const body = {
    userEmail,
  };

  const options = {
    method: 'get',
    body: JSON.stringify(body),
    headers: dataServiceRequestheaders,
  };

  const response = await makeRequest('/reports/findByEmail', options);

  return response;
};

module.exports = {
  sendDataToBeStored: sendDataToBeStored,
  readDataFromStore: readDataFromStore,
};
