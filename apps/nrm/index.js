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
      next: '/supporting-documents-add'
    },
    '/supporting-documents-add': {
      fields: [
        'supporting-documents-add'
      ],
      forks: [{
        target: '/supporting-documents',
        condition: {
          field: 'supporting-documents-add',
          value: 'yes'
        }
      }],
      next: '/confirm'
    },
    '/supporting-documents': {
      next: '/confirm'
    },
    '/confirm': {
       behaviours: ['complete'],
    }
  }
};
