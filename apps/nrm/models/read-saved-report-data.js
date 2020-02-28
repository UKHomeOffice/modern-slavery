'use strict';

const dataService = require('../../common/data-service');
const {
  makeRequest,
  requestHeaders,
} = dataService;

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
    headers: requestHeaders,
  };

  const response = await makeRequest('/reports/findByEmail', options);

  if (response) {
    // get the latest report saved by user for now
    const latestReport = response[response.length - 1];
    const savedData = latestReport ? JSON.parse(latestReport) : null;

    return savedData;
  }

  return response;
};

module.exports = readDataFromStore;
