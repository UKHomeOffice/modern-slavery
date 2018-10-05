'use strict';

const Redis = require('ioredis');
// Connect to 127.0.0.1:6379
const redis = new Redis();
const uuidv1 = require('uuid/v1');

module.exports = {
  save() {
    const token = uuidv1();
    redis.set(`token:${token}`, token);
    redis.expire(`token:${token}`, 86400);

    return token;
  }
};
