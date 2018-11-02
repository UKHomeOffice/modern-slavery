'use strict';

const Redis = require('ioredis');
const config = require('../../../config');
const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host
});

module.exports = {
 // check the token is in redis
 // catch is dealt with later by whatever calls this promise
  read(token) {
    return redis.get(`token:${token}`)
      .then((result) => result ? (true) : (false));
 },

  delete(token) {
    redis.del(`token:${token}`);
 }
};
