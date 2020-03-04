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
  const options = {
    method: 'get',
    body: null,
    headers: requestHeaders,
  };

  const response = await makeRequest(`/reports/findByEmail/${userEmail}`, options);

  if (response) {
    // get the latest report saved by user for now
    const latestReport = response[response.length - 1];

    return latestReport;
  }

  return response;
};

module.exports = readDataFromStore;
