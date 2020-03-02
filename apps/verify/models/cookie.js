'use strict';
const uuidv4 = require('uuid/v4');
const read = require('../../common/models/read-token');
const write = require('../../common/models/write-token');
const param = 'cookies';

const readUuid = async(uuid) => {
  return await read(uuid, param);
};

const writeCookie = async(data) => {
  data.uuid = uuidv4();
  return await write(data, param);
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
