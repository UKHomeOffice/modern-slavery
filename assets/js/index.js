'use strict';
// eslint-disable-next-line implicit-dependencies/no-implicit
require('$$theme');
var $ = require('jquery');

var accessibleAutocomplete = require('accessible-autocomplete');
// eslint-disable-next-line no-undef
var typeAhead = document.querySelectorAll('.typeahead');
if (typeAhead) {
  for (var x = 0; x < typeAhead.length; x++) {
    accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: typeAhead[x]
    });
  }
}

/**
 * Override for Start Page width
 */
// eslint-disable-next-line no-undef
if (window.location.pathname === '/start' || window.location.pathname === '/paper-version-download') {
  $('.column-two-thirds').addClass('max-page-width');
}

/**
 * This is in place to prevent duplicate form submissions.
 */
// eslint-disable-next-line no-undef
if (window.location.pathname === '/nrm/confirm') {
 $('input[value="Accept and send report"]').on('click', function disableDoubleClick() {
   $('input[value="Accept and send report"]').prop('disabled', true);
   $('form').submit();
 });
}
