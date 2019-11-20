'use strict';

/**
 * Send Data to Data Service
 *
 * @param {object} data - data to be sent to data store
 *
 * @returns {Promise} -  response from data service
 */
const sendDataToBeStored = async(data) => {
  return new Promise((resolve) => resolve(data));
};

module.exports = {
  sendDataToBeStored: sendDataToBeStored,
};
