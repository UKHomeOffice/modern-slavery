'use strict';
const uuidv4 = require('uuid/v4');
const read = require('./read-cookie');
const write = require('./write-cookie');

const readUuid = async(uuid) => {
  return await read(uuid);
};

const writeCookie = async(data) => {
  data.uuid = uuidv4();
  return await write(data);
};

module.exports = {
  /**
 * Get Nrm cookie value
 *
 * @param {object} cookies - (name, value [, options])
 *
 * @returns {string} uuid string
 */
  getNrmCookie(cookies) {
    return (cookies.nrm || null);
  },

  writeCookie,
  readUuid,
};
