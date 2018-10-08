'use strict';
const emailLookup = require('./behaviours/email-lookup');
const emailSender = require('./behaviours/email-sender');

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
      behaviours: [emailLookup],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
