'use strict';

// const config = require('../../config');
const x = 1;

module.exports = {
  save() {
    return new Promise((resolve, reject) => {
      if (x === 1) {
        return resolve(Math.random());
      } else {
        return reject('error');
      }
    });
  }
};
