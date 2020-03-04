'use strict';
const uuidv4 = require('uuid/v4');
const read = require('./read-token');
const write = require('./write-token');
const param = 'save-report-tokens';

const readUuid = async(uuid) => {
  return await read(uuid, param);
};

const writeToken = async(data) => {
  data.uuid = uuidv4();
  return await write(data, param);
};

module.exports = {
  writeToken,
  readUuid,
};
