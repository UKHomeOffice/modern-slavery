'use strict';

module.exports = {
  name: 'verify',
  steps: {
    '/user-email': {
      fields: ['user-email'],
      next: '/check-inbox'
    },
    '/check-inbox': {
    }
  }
};
