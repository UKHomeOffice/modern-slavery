'use strict';

module.exports = {
  'feedback': {
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
  'improvements': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [1200]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'email': {
    mixin: 'input-text',
    validate: ['email', {type: 'maxlength', arguments: [1200]}],
    legend: {
      className: 'visuallyhidden'
    }
  },
};
