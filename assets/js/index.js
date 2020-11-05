'use strict';
// eslint-disable-next-line implicit-dependencies/no-implicit
require('$$theme');
var $ = require('jquery');

var accessibleAutocomplete = require('accessible-autocomplete');
$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});

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

// list-entry pattern
if ($('.add-another').length) {
  var ukOrOverseas = $('.uk').length ?
    '#where-exploitation-happened-uk-city-' : '#where-exploitation-happened-overseas-country-';
  $('.autocomplete__wrapper').parent().addClass('list-entry');
  var totalInputs = $('.add-another .form-group input').length;
  var hiddenTotal = [];

  var addAnotherButton = $('<button type="button" class="govuk-button govuk-button--secondary"></button>');

  // eslint-disable-next-line no-inner-declarations
  function updateButtonText() {
    addAnotherButton.text('Add another location (' + hiddenTotal.length + ' remaining)');
  }

  $('.add-another .form-group select').each(function hideAdditional(index) {

    if (index > 0) {
      var removeButton =
        $('<button type="button" class="govuk-button govuk-button--secondary list-entry-button">Remove</button>');
      removeButton.click(function removeElement() {
        var removeIndex = index;
        $(this).parent().hide();
        $(this).parent().find('select').val('');

        hiddenTotal.push(removeIndex + 1);
        updateButtonText();

        if (hiddenTotal.length > 0) {
          addAnotherButton.show();
        }
        return false;
      });
      removeButton.insertAfter(this);
    }

    if (index > 0 && $(this).val() === '') {
      $(this).parents('.form-group').hide();
      hiddenTotal.push(index + 1);
    }
  });

  addAnotherButton.click(function showAdditional() {
    hiddenTotal = hiddenTotal.sort(function sortNums(a, b) {
      return b - a;
    });

    $(ukOrOverseas + hiddenTotal.pop() + '-group').show();
    updateButtonText();

    if (hiddenTotal.length === 0) {
      $(this).hide();
    }

    return false;
  });

  addAnotherButton.insertAfter(ukOrOverseas + totalInputs + '-group');
  if (hiddenTotal.length === 0) {
    addAnotherButton.hide();
  }
  updateButtonText();
}
