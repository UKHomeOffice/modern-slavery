'use strict';

const countries = require('../../../ms-lists/ms_countries');

const countriesExcludingUK = countries.filter(country => country.value !== 'United Kingdom');

module.exports = {
  countriesExcludingUK
};
