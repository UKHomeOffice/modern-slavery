'use strict';

/**
 * Write Data to Database
 *
 * Connect to the DB service here
 *
 * @param {object} data - data to be persited to database
 *
 * @returns {Promise} -  row id
 */
const writeToDB = async(data) => {
  return {
    response: null,
    request: data,
  };
};

module.exports = {
  write: writeToDB,
};
