'use strict';

const fetch = require('node-fetch');
const base64 = require('base-64');

const dataService = require('../../../config').dataService;
const {
  url: dataServiceUrl,
  login,
  password,
} = dataService;

const requestHeaders = {
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

module.exports = {
  makeRequest,
  requestHeaders,
};
