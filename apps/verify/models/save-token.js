'use strict';

const Redis = require('ioredis');
// Connect to Redis
const redis = new Redis();
const uuidv1 = require('uuid/v1');
const tokenExpiry = require('../../../config').tokenExpiry;

module.exports = {
  save() {
    const token = uuidv1();
    redis.set(`token:${token}`, token);
    redis.expire(`token:${token}`, tokenExpiry);

    return token;
  }
};
