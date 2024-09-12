/* eslint-disable no-var, vars-on-top, consistent-return */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const $ = require('jquery');
const govuk = require('govuk-frontend');
const typeahead = require('typeahead-aria');
const Bloodhound = require('typeahead-aria').Bloodhound;

typeahead.loadjQueryPlugin();

$('.typeahead').each(function applyTypeahead() {
  var $el = $(this);
  var $parent = $el.parent();
  var attributes = $el.prop('attributes');
  var $input = $('<input/>');
  var selectedValue = $el.val();
  var typeaheadList = $el.find('option').map(function mapOptions() {
    if (this.value === '') {
      // remove any empty values from typeahead
      return;
    }
    return this.value;
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, function applyAttributes() {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $input.typeahead({
    hint: false
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList,
      sorter: function sorter(a, b) {
        var input = $input.val();
        var startsWithInput = function startsWithInput(x) {
          return (x.toLowerCase().substr(0, input.length) === input.toLowerCase()) ? -1 : 1;
        };

        var compareAlpha = function compareAlpha(x, y) {
          var less = (x < y) ? -1 : 1;
          return (x === y) ? 0 : less;
        };

        var compareStartsWithInput = function compareStartsWithInput(x, y) {
          var startsWithFirst = startsWithInput(x);
          var startsWithSecond = startsWithInput(y);

          return (startsWithFirst === startsWithSecond) ? 0 : startsWithFirst;
        };

        var first = compareStartsWithInput(a, b);

        return (first === 0) ? compareAlpha(a, b) : first;
      }
    }),
    limit: 100
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
  var totalInputs = $('.add-another .govuk-form-group input').length;
  var hiddenTotal = [];

  var addAnotherButton = $('<button type="button" class="govuk-button govuk-button--secondary"></button>');

  // eslint-disable-next-line no-inner-declarations
  function updateButtonAndText() {
    // last item that's visible
    var lastVisibleIndex = $('.add-another .govuk-form-group select').length - hiddenTotal.length;
    $(ukOrOverseas + lastVisibleIndex + '-group button').show();
    addAnotherButton.text('Add another location (' + hiddenTotal.length + ' remaining)');
  }

  $('.add-another .govuk-form-group select').each(function hideAdditional(index) {
    if (index > 0) {
      var removeButton =
        $('<button type="button" class="govuk-button govuk-button--secondary list-entry-button">Remove</button>')
          .hide();
      removeButton.click(function removeElement() {
        var removeIndex = index;
        var parent = $(this).parent();
        parent.hide();
        parent.find('select').val('');

        hiddenTotal.push(removeIndex + 1);
        updateButtonAndText();

        if (hiddenTotal.length > 0) {
          addAnotherButton.show();
        }
        return false;
      });
      removeButton.insertAfter(this);
    }

    if (index > 0 && $(this).val() === '') {
      $(this).parents('.govuk-form-group').hide();
      hiddenTotal.push(index + 1);
    }
  });

  addAnotherButton.click(function showAdditional() {
    hiddenTotal = hiddenTotal.sort(function sortNums(a, b) {
      return b - a;
    });

    var index = hiddenTotal.pop();

    for (var x = 2; x < index; x++) {
      $(ukOrOverseas + x + '-group button').hide();
    }
    $(ukOrOverseas + index + '-group button').show();
    $(ukOrOverseas + index + '-group').show();

    updateButtonAndText();

    if (hiddenTotal.length === 0) {
      $(this).hide();
    }

    return false;
  });

  addAnotherButton.insertAfter(ukOrOverseas + totalInputs + '-group');
  if (hiddenTotal.length === 0) {
    addAnotherButton.hide();
  }
  updateButtonAndText();

  $('.add-another').show();
}

govuk.initAll();
