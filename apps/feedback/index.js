'use strict';

const sendFeedback = require('./behaviours/send-feedback');

module.exports = {
  name: 'feedback',
  baseUrl: '/feedback',
  steps: {
    '/start': {
      backLink: false,
      behaviours: [sendFeedback],
      fields: ['feedback', 'improvements', 'email'],
      next: '/complete'
    },
    '/complete': {
      backLink: false
    }
  }
};
