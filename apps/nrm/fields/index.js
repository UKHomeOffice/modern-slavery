'use strict';

const _ = require('lodash');
const ukCitiesAndTowns = require('../../../ms-lists/ms_uk_cities_and_towns');
const ukRegions = require('../../../ms-lists/ms_uk_regions');
const countriesExcludingUK = require('../util/filtered-countries').countriesExcludingUK;
const ukPoliceForces = require('../../../ms-lists/ms_uk_police_forces');
const dateComponent = require('hof').components.date;
const ukLocalAuthorities = require('../../../ms-lists/ms_uk_local_authorities');
const msNationalities = require('../../../ms-lists/ms_nationalities');
const organisations = require('../../../ms-lists/ms_organisations');

module.exports = {
  reference: {
    mixin: 'input-text',
    validate: ['required']
  },
  'user-organisation': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.user-organisation.options.none_selected'
    }].concat(_.sortBy(organisations, o => o.label))
  },
  'fr-location': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'england',
      'wales',
      'scotland',
      'northern-ireland'
    ]
  },
  'pv-under-age': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'local-authority-contacted-about-child-local-authority-name': {
    mixin: 'select',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.local-authority-contacted-about-child.options.null'
    }].concat(ukLocalAuthorities)
  },
  'local-authority-contacted-about-child-local-authority-phone': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    type: 'tel'
  },
  'local-authority-contacted-about-child-local-authority-email': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: [15000] }],
    type: 'email'
  },
  'local-authority-contacted-about-child-local-authority-first-name': {
    mixin: 'input-text',
    validate: [{ type: 'maxlength', arguments: [15000] }]
  },
  'local-authority-contacted-about-child-local-authority-last-name': {
    mixin: 'input-text',
    validate: [{ type: 'maxlength', arguments: [15000] }]
  },
  'pv-under-age-at-time-of-exploitation': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'what-happened': {
    backLink: false,
    mixin: 'textarea',
    'ignore-defaults': true,        // override default formatting options so we can exclude `singlespaces`
    formatter: ['trim', 'hyphens'], // the default formatters, omitting `singlespaces`
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    legend: {
      className: 'govuk-textarea no-margin'
    },
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  birthplace: {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  family: {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  education: {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'employment-history': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'when-did-the-exploitation-take-place': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'more-than-one-exploitation-situation': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'how-did-the-exploitation-start': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'were-they-taken-somewhere-by-their-exploiter': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [{
      value: 'yes',
      toggle: 'were-they-taken-somewhere-by-their-exploiter-details-fieldset',
      child: 'partials/were-they-taken-somewhere-by-their-exploiter'
    }, {
      value: 'no'
    }]
  },
  'were-they-taken-somewhere-by-their-exploiter-journey-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ],
    dependent: {
      value: 'yes',
      field: 'were-they-taken-somewhere-by-their-exploiter'
    }
  },
  'what-were-they-required-to-do': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'how-they-were-treated': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'why-they-stayed': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'how-why-did-they-leave-the-situation': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'when-last-contact': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'within-the-last-week',
      'within-the-last-month',
      'within-the-last-3-month',
      'within-the-last-6-month',
      'over-a-year-ago',
      'not-sure'
    ]
  },
  'details-last-contact': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 15000 }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'is-this-the-first-chance-to-report': {
    mixin: 'radio-group',
    validate: ['required'],
    isPageHeading: true,
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'why-report-now': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'why-are-you-making-the-referral': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'where-how-interview-carried-out': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'are-others-involved': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'are-others-involved-details-fieldset',
      child: 'partials/are-others-involved'
    }, {
      value: 'no'
    }]
  },
  'are-others-involved-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ],
    dependent: {
      value: 'yes',
      field: 'are-others-involved'
    }
  },
  'evidence-of-dishonesty': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'evidence-of-dishonesty-details-fieldset',
      child: 'partials/evidence-of-dishonesty'
    }, {
      value: 'no'
    }]
  },
  'evidence-of-dishonesty-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ],
    dependent: {
      value: 'yes',
      field: 'evidence-of-dishonesty'
    }
  },
  'what-evidence-you-will-submit': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ]
  },
  'where-exploitation-happened': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'uk',
      'overseas',
      'uk-and-overseas'
    ]
  },
  'where-exploitation-happened-uk-city-1': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-2': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-3': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-4': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-5': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-6': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-7': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-8': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-9': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-10': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-other-uk-other-location': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: [{ type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ]
  },
  'where-exploitation-happened-overseas-country-1': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-1'],
    validate: 'required',
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-2': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-2'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-3': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-3'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-4': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-4'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-5': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-5'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-6': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-6'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-7': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-7'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-8': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-8'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-9': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-9'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-10': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-10'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-other-overseas-other-location': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: [{ type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ]
  },
  'current-pv-location-uk-city': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-locationd-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'current-pv-location-uk-region': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-location-uk-region.options.null'
    }].concat(ukRegions)
  },
  'who-exploited-pv': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ]
  },
  'exploiters-location': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  'are-exploiters-in-the-uk': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  'exploiters-current-location-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ]
  },
  'types-of-exploitation-forced-to-work': {
    mixin: 'checkbox',
    validation: 'at-least-one-option-selected'
  },
  'types-of-exploitation-wages-taken': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-forced-to-commit-fraud': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-prostitution': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-child-exploitation': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-taken-somewhere': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-forced-to-commit-crime': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-organs-removed': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-unpaid-household-work': {
    mixin: 'checkbox'
  },
  'types-of-exploitation-other': {
    mixin: 'checkbox',
    toggle: 'other-exploitation-fieldset',
    child: 'partials/other-exploitation-fieldset'
  },
  'other-exploitation-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [{
      attribute: 'rows',
      value: 4
    }],
    validationLink: {
      value: 'true',
      field: 'types-of-exploitation-other'
    }
  },
  'any-other-pvs': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'future-exploitation-concerns': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  'future-exploitation-reasons': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 3
      }
    ]
  },
  'reported-to-police': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'yes-crime-reference-fieldset',
      child: 'partials/reported-to-police-yes'
    }, {
      value: 'no'
    }]
  },
  'reported-to-police-police-forces': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.reported-to-police-police-forces.options.null'
    }].concat(ukPoliceForces),
    validationLink: {
      value: 'yes',
      field: 'reported-to-police'
    }
  },
  'reported-to-police-crime-reference': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'yes',
      field: 'reported-to-police'
    }
  },
  'authorities-cooperation': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'authorities-cooperation-details',
      child: 'textarea'
    }, {
      value: 'no'
    }]
  },
  'authorities-cooperation-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['notUrl', { type: 'maxlength', arguments: 15000 }],
    attributes: [
      {
        attribute: 'rows',
        value: 14
      }
    ],
    dependent: {
      value: 'yes',
      field: 'authorities-cooperation'
    }
  },
  'pv-want-to-submit-nrm': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes'
    }, {
      value: 'no'
    }]
  },
  'refuse-nrm': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: [{ type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 3
      }
    ]
  },
  'does-pv-need-support': {
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
  'pv-phone-number': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-phone-number-yes',
      child: 'input-text'
    },
    {
      value: 'pv-alternative-number',
      toggle: 'pv-alternative-number-details-fieldset',
      child: 'partials/pv-alternative-number-details'
    },
    {
      value: 'no',
      toggle: 'no-contact-details-fieldset',
      child: 'partials/no-contact-details'
    }
    ]
  },
  'pv-phone-number-yes': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber'],
    dependent: {
      value: 'yes',
      field: 'pv-phone-number'
    },
    labelClassName: ['govuk-body govuk-!-font-weight-bold'],
    type: 'tel'
  },
  'pv-phone-number-alternative': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', 'internationalPhoneNumber'],
    dependent: {
      value: 'pv-alternative-number',
      field: 'pv-phone-number'
    },
    type: 'tel'
  },
  'alternative-number-relation-to-pv': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', { type: 'maxlength', arguments: [250] }],
    dependent: {
      value: 'pv-alternative-number',
      field: 'pv-phone-number'
    }
  },
  'no-contact-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ],
    dependent: {
      value: 'no',
      field: 'pv-phone-number'
    }
  },
  'pv-name-first-name': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  'pv-name-last-name': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  'pv-name-nickname': {
    mixin: 'input-text',
    validate: [{ type: 'maxlength', arguments: [15000] }]
  },
  'pv-dob': dateComponent('pv-dob', {
    mixin: 'input-date',
    labelClassName: 'visuallyhidden',
    validate: ['date', 'before', { type: 'after', arguments: '1900-01-01' }]
  }),
  'pv-gender': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      'female',
      'male',
      'unknown'
    ]
  },
  'does-pv-have-children': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [{
      value: 'yes',
      toggle: 'does-pv-have-children-yes-amount',
      child: 'input-text'
    }, {
      value: 'no'
    }]
  },
  'does-pv-have-children-yes-amount': {
    mixin: 'input-text',
    validate: ['required', 'numeric', { type: 'maxlength', arguments: [15000] }],
    dependent: {
      value: 'yes',
      field: 'does-pv-have-children'
    }
  },
  'pv-nationality': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality.options.null'
    }].concat(msNationalities)
  },
  'pv-nationality-second': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality-second.options.null'
    }].concat(msNationalities)
  },
  'pv-interpreter-requirements': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [{
      value: 'yes',
      toggle: 'pv-interpreter-requirements-language',
      child: 'input-text'
    }, {
      value: 'no'
    }]
  },
  'pv-interpreter-requirements-language': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    dependent: {
      value: 'yes',
      field: 'pv-interpreter-requirements'
    }
  },
  'pv-other-help-with-communication': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [{
      value: 'yes',
      toggle: 'pv-other-help-with-communication-aid',
      child: 'input-text'
    }, {
      value: 'no'
    }]
  },
  'pv-other-help-with-communication-aid': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    dependent: {
      value: 'yes',
      field: 'pv-other-help-with-communication'
    }
  },
  'pv-ho-reference': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [{
      value: 'yes',
      toggle: 'pv-ho-reference-type',
      child: 'input-text'
    }, {
      value: 'no'
    }]
  },
  'pv-ho-reference-type': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    dependent: {
      value: 'yes',
      field: 'pv-ho-reference'
    }
  },
  'who-contact': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'potential-victim',
      'someone-else'
    ]
  },
  'pv-contact-details': {
    mixin: 'checkbox-group',
    isPageHeading: true,
    validate: ['required'],
    options: [{
      value: 'email',
      toggle: 'pv-contact-details-email-input-fieldset',
      child: 'partials/pv-contact-details-email-input'
    }, {
      value: 'post',
      toggle: 'pv-contact-details-post-fieldset',
      child: 'partials/pv-contact-details-post'
    }]
  },
  'pv-contact-details-email-input': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'email',
      field: 'pv-contact-details'
    },
    type: 'email'
  },
  'pv-contact-details-email-check': {
    mixin: 'checkbox',
    validate: ['required'],
    validationLink: {
      value: 'email',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-street': {
    mixin: 'input-text',
    className: ['govuk-input'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-town': {
    mixin: 'input-text',
    className: ['govuk-input govuk-!-width-two-thirds'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-county': {
    mixin: 'input-text',
    className: ['govuk-input govuk-!-width-two-thirds'],
    validate: [{ type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-postcode': {
    mixin: 'input-text',
    className: ['govuk-input govuk-input--width-10'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-post-check': {
    mixin: 'checkbox',
    validate: ['required'],
    validationLink: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'someone-else': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'email',
      toggle: 'someone-else-email-input',
      child: 'input-text'
    }, {
      value: 'post',
      toggle: 'someone-else-post-fieldset',
      child: 'partials/someone-else-post'
    }]
  },
  'someone-else-first-name': {
    mixin: 'input-text',
    validate: [{ type: 'maxlength', arguments: [15000] }]
  },
  'someone-else-last-name': {
    mixin: 'input-text',
    validate: [{ type: 'maxlength', arguments: [15000] }]
  },
  'someone-else-email-input': {
    mixin: 'input-text',
    validate: ['required', 'email', { type: 'maxlength', arguments: [15000] }],
    dependent: {
      value: 'email',
      field: 'someone-else'
    },
    type: 'email'
  },
  'someone-else-street': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-town': {
    mixin: 'input-text',
    className: ['govuk-input govuk-!-width-two-thirds'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-county': {
    mixin: 'input-text',
    className: ['govuk-input govuk-!-width-two-thirds'],
    validate: [{ type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-postcode': {
    mixin: 'input-text',
    className: ['govuk-input govuk-input--width-10'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    validationLink: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-permission-check': {
    mixin: 'checkbox',
    validate: ['required']
  },
  'fr-details-first-name': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  'fr-details-last-name': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  'fr-details-role': {
    mixin: 'input-text',
    validate: ['required', { type: 'maxlength', arguments: [15000] }]
  },
  'fr-details-phone': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-20'],
    validate: ['required', { type: 'maxlength', arguments: [15000] }],
    type: 'tel'
  },
  'fr-alternative-contact': {
    mixin: 'input-text',
    className: ['govuk-input'],
    validate: ['email', { type: 'maxlength', arguments: [15000] }],
    type: 'email'
  }
};
