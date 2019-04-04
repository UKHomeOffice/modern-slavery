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
  async read(token) {
    const user = {};
    user.valid = await redis.get(`token:${token}`);
    user.email = await redis.get(`${token}:email`);
    user.organisation = await redis.get(`${token}:organisation`);
    return user;
 },

  delete(token) {
    redis.del(`token:${token}`);
 }
};
