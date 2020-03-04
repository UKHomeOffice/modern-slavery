'use strict';

const {
  makeRequest,
  requestHeaders,
} = require('../data-service');

/**
 * API post - create cookie in the database
 *
 * @param {object} data - {created, uuid, userEmail} sent to the db
 * @param {string} path -  either `cookies` or `short-life-tokens`
 *
 * @returns {Promise} response
 */
const sendDataToBeStored = async(data, path) => {
  // current date
  const created = (new Date()).toISOString();
  const uuid = data.uuid;
  const userEmail = data['user-email'];

  const body = {
    created,
    uuid,
    'useremail': userEmail
  };

  const options = {
    method: 'post',
    body: JSON.stringify(body),
    headers: requestHeaders,
  };

  try {
    // path: /cookies or /short-life-tokens
    const response = await makeRequest(`/${path}`, options);
    const responseString = JSON.stringify(response);
    // this looks for an error in the response
    // Api is not responding with 200 or 400 as expected
    if (!response.code) {
      return uuid;
    }
    // eslint-disable-next-line no-console
    console.error(`Made a successful POST but did not get a proper response
      ${responseString}`);
      throw Error(responseString);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Unable to make POST request to write cookie
      ${e.name}: ${e.message}`);
    throw e;
  }
};

module.exports = sendDataToBeStored;
