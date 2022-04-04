'use strict';

const countries = require('ms-countries');

const countriesExcludingUK = countries.filter(country => country.value !== 'United Kingdom');

module.exports = {
  countriesExcludingUK
};
