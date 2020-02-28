'use strict';

const {
  makeRequest,
  requestHeaders,
} = require('../../common/data-service');

/**
 * API post - create cookie in the database
 *
 * @param {object} data - {created, uuid, userEmail} sent to the db
 *
 * @returns {Promise} response
 */
const sendDataToBeStored = async(data) => {
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
    const response = await makeRequest('/cookies', options);
    if (response) {
      return uuid;
    }
    // eslint-disable-next-line no-console
    console.error(`Made a successful POST but did not get a proper response
      ${response}`);
      throw Error(response);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Unable to make POST request to write cookie
      ${e.name}: ${e.message}`);
    throw e;
  }
};

module.exports = sendDataToBeStored;
