'use strict';

module.exports = {
  'user-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'victim-age': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  }
};
