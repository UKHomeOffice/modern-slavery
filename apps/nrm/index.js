'use strict';

const checkEmailToken = require('./behaviours/check-email-token');

module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
  pages: {
    '/token-invalid': 'token-invalid'
  },
  steps: {
    '/start': {
      behaviours: [checkEmailToken],
      next: '/victim-age'
    },
    '/victim-age': {
    }
  }
};
