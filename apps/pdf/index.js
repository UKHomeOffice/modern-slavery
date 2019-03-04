'use strict';

const generateSendPdf = require('./behaviours/generate-send-pdf');

module.exports = {
  name: 'pdf',
  pages: {
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
