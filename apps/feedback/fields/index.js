'use strict';

module.exports = {
  'feedback': {
    mixin: 'radio-group',
    validate: 'required',
    options: [
      'very-satisfied',
      'satisfied',
      'neutral',
      'dissatisified',
      'very-dissatisified'
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
};