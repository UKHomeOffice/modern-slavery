'use strict';
const emailLookup = require('./behaviours/email-lookup');

module.exports = {
  name: 'verify',
  steps: {
    '/user-email': {
      fields: ['user-email'],
      behaviours: [emailLookup],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
