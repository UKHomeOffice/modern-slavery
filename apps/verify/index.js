'use strict';
const emailLookup = require('./behaviours/email-lookup');
const emailSender = require('./behaviours/email-sender');
const emailPasser = require('./behaviours/email-passer');

module.exports = {
  name: 'verify',
  pages: {
    '/email-not-recognised': 'email-not-recognised'
  },
  steps: {
    '/user-email': {
      fields: ['user-email'],
      next: '/confirm-email'
    },
    '/confirm-email': {
      fields: ['confirm-email'],
      behaviours: [emailPasser, emailLookup, emailSender],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
