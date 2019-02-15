'use strict';

const pdf = require('./behaviours/pdf');

module.exports = {
  name: 'pdf',
  baseUrl: '/pdf',
  steps: {
    '/generate': {
      fields: ['email'],
      behaviours: [pdf],
      next: '/complete'
    },
    '/complete': {
    }
  }
};
