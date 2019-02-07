'use strict';
const emailLookupAndSend = require('./behaviours/email-lookup-sender');
const emailPasser = require('./behaviours/email-passer');

module.exports = {
  name: 'verify',
  pages: {
    '/email-not-recognised': 'email-not-recognised'
  },
  steps: {
    '/start': {
      next: '/user-email'
    },
    '/user-email': {
      fields: ['user-email'],
      next: '/confirm-email'
    },
    '/confirm-email': {
      fields: ['confirm-email'],
      behaviours: [emailPasser, emailLookupAndSend],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
