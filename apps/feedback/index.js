'use strict';

module.exports = {
  name: 'feedback',
  baseUrl: '/feedback',
  steps: {
    '/start': {
      fields: ['feedback', 'improvements'],
      next: '/complete'
    },
    '/complete': {
    }
  }
};
