'use strict';

const ukCitiesAndTowns = require('ms-uk-cities-and-towns');
const ukRegions = require('ms-uk-regions');
const countries = require('hof-util-countries')();

module.exports = {
  'fr-location': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'england',
      'wales',
      'scotland',
      'northern-ireland'
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
      value: 'not-sure',
      toggle: 'not-sure-toggle-content',
      child: 'partials/panel'
    }]
  },
  'pv-under-age-at-time-of-exploitation': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure',
    ]
  },
  'what-happened': {
    mixin: 'textarea',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 14
    }]
  },
  'where-exploitation-happened': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'uk',
      toggle: 'uk-location-details-fieldset',
      child: 'partials/where-exploitation-happened-uk-panel'
    }, {
      value: 'overseas',
      toggle: 'overseas-location-details-fieldset',
      child: 'partials/where-exploitation-happened-overseas-panel'
    }]
  },
  'where-exploitation-happened-uk-city': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns),
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-uk-region': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-region.options.null'
    }].concat(ukRegions),
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-overseas-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: 'required',
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countries),
    dependent: {
      value: 'overseas',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-other-uk-other-location': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }],
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-other-overseas-other-location': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }],
    dependent: {
      value: 'overseas',
      field: 'where-exploitation-happened',
    },
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
