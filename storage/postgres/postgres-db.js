'use strict';

const config = require('../../config');
const pg = require('pg');
const queries = require('./util/queries');
const dataMapper = require('./util/data-mapping');
const PGPool = pg.Pool;

let poolClient;

/**
 * Connect to Database
 *
 * @returns {Promise} - object containing the database connection
 */
async function connect() {
  if (!poolClient) {
    poolClient = new PGPool({
      user: config.postgre.user,
      host: config.postgre.host,
      database: config.postgre.database.reports,
      password: config.postgre.password,
      port: config.postgre.port,
    });
  }

  return poolClient;
}

/**
 * Create a row in the database table
 *
 * @param {object} data - data to be inserted into document { userEmail, jsonSavedData }
 *
 * @returns {Promise} - row id
 */
async function create(data) {
  try {
    const mappedData = dataMapper.getData(data);
    const { userEmail, jsonSavedData } = mappedData;

    poolClient = await connect();

    const resultId = poolClient.query(
      queries.insertSessionData,
      [userEmail, jsonSavedData],
      (error, results) => {
        if (error) {
          throw error;
        }
        return results.insertId;
      });

    return resultId;
  } catch (e) {
    // console.error(`reports CREATE ERROR ${e.stack}`);
    throw e;
  }
}

module.exports = {
  create,
};
