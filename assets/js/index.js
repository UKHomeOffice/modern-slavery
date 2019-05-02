'use strict';
// eslint-disable-next-line implicit-dependencies/no-implicit
require('$$theme');

var $ = require('jquery');
var typeahead = require('typeahead-aria');
var Bloodhound = require('typeahead-aria').Bloodhound;

typeahead.loadjQueryPlugin();

$('.typeahead').each(function applyTypeahead() {
  var $el = $(this);
  var $parent = $el.parent();
  var attributes = $el.prop('attributes');
  var $input = $('<input/>');
  var selectedValue = $el.val();
  var typeaheadList = $el.find('option').map(function mapOptions() {
    if (this.value === '') {
      return undefined;
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
            return x.toLowerCase().substr(0, input.length) === input.toLowerCase() ? -1 : 1;
          };

          var compareAlpha = function compareAlpha(x, y) {
            var less = x < y ? -1 : 1;
            return x === y ? 0 : less;
          };

          var compareStartsWithInput = function compareStartsWithInput(x, y) {
            var startsWithFirst = startsWithInput(x);
            var startsWithSecond = startsWithInput(y);

            return startsWithFirst === startsWithSecond ? 0 : startsWithFirst;
          };

          var first = compareStartsWithInput(a, b);

          return first === 0 ? compareAlpha(a, b) : first;
        }
      }),
      limit: 100
    });
});

/**
 * Override for Start Page width
 */
// eslint-disable-next-line no-undef
if (window.location.pathname === '/start') {
  $('.column-two-thirds').addClass('max-page-width');
}


/**
 * Disable Input Button before form is submitted
 */
function disableDuplicateSubmission() {
  $('input[value="Accept and send report"]').prop('disabled', true);
  $('form').submit();
}

/**
 * Disable submit button on submission of form
 *
 * This is in place to prevent duplicate form submissions.
 */
// eslint-disable-next-line no-undef
if (window.location.pathname.indexOf('confirm') > -1) {
  $('input[value="Accept and send report"]').on('click', disableDuplicateSubmission());
}
