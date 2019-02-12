'use strict';

const pdf = require('./behaviours/pdf');

module.exports = {
  name: 'pdf',
  baseUrl: '/pdf',
  steps: {
    '/generate': {
      behaviours: [pdf],
      next: '/complete'
    },
    '/complete': {
    }
  }
};
