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
  'pv-under-age': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'yes-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'no',
      toggle: 'no-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'notsure',
      toggle: 'notsure-toggle-content',
      child: 'partials/panel'
    }]
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
