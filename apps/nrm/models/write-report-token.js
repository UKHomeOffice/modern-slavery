'use strict';

const {
  makeRequest,
  requestHeaders,
} = require('../../common/data-service');

/**
 * API post - create short token in db for a saved report
 *
 * @param {object} data - {created, uuid, user-email} sent to the db
 *
 * @returns {Promise} response
 */
const sendDataToBeStored = async(data) => {
  // current date
  const created = (new Date()).toISOString();

  const body = {
    created,
    uuid: data.uuid,
    'useremail': data['user-email']
  };

  const options = {
    method: 'post',
    body: JSON.stringify(body),
    headers: requestHeaders,
  };

  try {
    const response = await makeRequest('/cookies', options);
    if (response) {
      return data.uuid;
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
