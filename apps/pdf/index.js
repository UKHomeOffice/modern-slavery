'use strict';

const generateSendPdf = require('./behaviours/generate-send-pdf');
const addHostUrl = require('./behaviours/add-local-host');

module.exports = {
  name: 'pdf',
  pages: {
    behaviours: addHostUrl,
    '/pdf': 'pdf'
  },
  baseUrl: '/pdf',
  steps: {
    '/generate': {
      fields: ['email'],
      behaviours: generateSendPdf,
      next: '/complete'
    },
    '/complete': {
    }
  }
};
