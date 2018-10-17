'use strict';

const Redis = require('ioredis');
const redis = new Redis();

module.exports = {
  // check the token is in redis
  read(token, resolve, reject) {
    redis.get(`token:${token}`)
      .then((result) => {
        if (result) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('error reading Redis token', err);
        return reject(err);
      });
  },

  delete(token) {
    redis.del(`token:${token}`);
  }
};
