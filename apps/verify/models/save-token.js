'use strict';

const Redis = require('ioredis');
const config = require('../../../config');
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host
});
const uuidv1 = require('uuid/v1');
const tokenExpiry = require('../../../config').tokenExpiry;

module.exports = {
  save(email, organisation) {
    const token = uuidv1();
    redis.set(`token:${token}`, token);
    redis.set(`${token}:email`, email);
    redis.set(`${token}:organisation`, organisation);
    redis.expire(`token:${token}`, tokenExpiry);
    redis.expire(`${token}:email`, tokenExpiry);
    redis.expire(`${token}:organisation`, tokenExpiry);

    return token;
  }
};
