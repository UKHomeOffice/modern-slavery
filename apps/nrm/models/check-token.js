'use strict';

const Redis = require('ioredis');
const redis = new Redis();

module.exports = {
 // check the token is in redis
 read(token, resolve) {
   return redis.get(`token:${token}`)
     .then((result) => result ? resolve(true) : resolve(false));
 },

 delete(token) {
   redis.del(`token:${token}`);
 }
};
