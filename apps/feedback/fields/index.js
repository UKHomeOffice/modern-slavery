'use strict';

module.exports = {
  feedback: {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'very-satisfied',
      'satisfied',
      'neutral',
      'dissatisfied',
      'very-dissatisfied'
    ]
  },
  improvements: {
    mixin: 'textarea',
    'ignore-defaults': true,        // override default formatting options so we can exclude `singlespaces`
    formatter: ['trim', 'hyphens'], // the default formatters, omitting `singlespaces`
    validate: ['required', { type: 'maxlength', arguments: [1200] }],
    legend: {
      className: 'visuallyhidden'
    },
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  email: {
    mixin: 'input-text',
    validate: ['email', { type: 'maxlength', arguments: [1200] }],
    legend: {
      className: 'visuallyhidden'
    },
    type: 'email'
  }
};
