'use strict';

const dataService = require('../data-service');
const {
  makeRequest,
  requestHeaders,
} = dataService;

/**
 * API get - check nrm cookie
 *
 * @param {string} uuid
 * @param {string} path - api end point `cookies` or `short-life-tokens`
 *
 * @returns {Promise} - response from data service (the row data)
 */
const readDataFromStore = async(uuid, path) => {

  const options = {
    method: 'get',
    body: null,
    headers: requestHeaders,
  };

  try {
    const response = await makeRequest(`/${path}/${uuid}`, options);
    return (response || null);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Unable to make GET request to read cookie
      ${e.name}: ${e.message}`);
    throw e;
  }
};

module.exports = readDataFromStore;
