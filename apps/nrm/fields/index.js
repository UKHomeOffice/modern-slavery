'use strict';

module.exports = {
  'select-location': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'england',
      'wales',
      'scotland',
      'northernireland'
    ]
  },
  'supporting-documents-add': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'supporting-document-upload': {
    mixin: 'input-file',
    validate: 'required'
  },
  'supporting-document-description': {
    mixin: 'textarea'
  },
  'supporting-documents-add-another': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
};
