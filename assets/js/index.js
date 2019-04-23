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
 * Override to remove dashes and capitalise first letters on Summary page answers
 *
 * @returns {void}
 */
const formatSummaryPageAnswersDisplay = () => {
  const answersWithFirstLetterToBeCapitalised = $('.capitalise-first-letter');

  for (let i = 0; i < answersWithFirstLetterToBeCapitalised.length; i++) {
    const originalText = answersWithFirstLetterToBeCapitalised[i].innerText;
    const capitalisedText = originalText.charAt(0).toUpperCase() + originalText.slice(1);

    answersWithFirstLetterToBeCapitalised[i].innerText = capitalisedText;
  }

  const answersWithDashesToBeRemoved = $('.remove-dashes');

  for (let i = 0; i < answersWithDashesToBeRemoved.length; i++) {
    const originalText = answersWithDashesToBeRemoved[i].innerText;
    const strippedDashes = originalText.replace('-', ' ');

    answersWithDashesToBeRemoved[i].innerText = strippedDashes;
  }
};

// eslint-disable-next-line no-undef
if (window.location.pathname.includes('/confirm')) {
  formatSummaryPageAnswersDisplay();
}
