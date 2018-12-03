'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const summary = require('hof-behaviour-summary-page');
const supportingDocuments = require('./behaviours/supporting-documents');

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
      behaviours: supportingDocuments,
      fields: [
      'supporting-document-upload',
      'supporting-document-description'
      ],
      continueOnEdit: true,
      next: '/confirm'
    },
    '/confirm': {
       behaviours: ['complete', summary],
    }
  }
};
