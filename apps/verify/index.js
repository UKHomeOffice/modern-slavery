'use strict';
const emailLookup = require('./behaviours/email-lookup');
const emailSender = require('./behaviours/email-sender');

module.exports = {
  name: 'verify',
  steps: {
    '/user-email': {
      fields: ['user-email'],
      behaviours: [emailLookup, emailSender],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
