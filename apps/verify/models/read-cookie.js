'use strict';

const dataService = require('../../common/data-service');
const {
  makeRequest,
  requestHeaders,
} = dataService;

/**
 * API get - check nrm cookie
 *
 * @param {string} uuid - unique id for the cookie
 *
 * @returns {Promise} - response from data service (the row data)
 */
const readDataFromStore = async(uuid) => {

  const options = {
    method: 'get',
    body: null,
    headers: requestHeaders,
  };

  try {
    const response = await makeRequest(`/cookies/${uuid}`, options);
    return (response || null);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Unable to make GET request to read cookie
      ${e.name}: ${e.message}`);
    throw e;
  }
};

module.exports = readDataFromStore;
