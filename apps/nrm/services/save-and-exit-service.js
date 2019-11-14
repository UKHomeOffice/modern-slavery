'use strict';
const postgresDB = require('../../../storage/postgres/postgres-db');

/**
 * Write Data to Database
 *
 * @param {object} data - data to be persited to database
 *
 * @returns {Promise} -  row id
 */
const writeToDB = async(data) => {
  return await postgresDB.create(data);
};

module.exports = {
  write: writeToDB,
};
