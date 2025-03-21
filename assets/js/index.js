/* eslint-disable no-var, vars-on-top */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const $ = require('jquery');
const govuk = require('govuk-frontend');
const accessibleAutocomplete = require('accessible-autocomplete');
const config = require('../../config.js');

document.addEventListener('DOMContentLoaded', () => {
  const fileUpload = document.getElementById('upload-file');
  const uploadPageLoaderContainer = document.getElementById('upload-page-loading-spinner');
  const fileUploadSaveAndContinue = document.querySelector('input[type=submit]');

  const fileUploadStatusHandler = (status, errorType) => {
    const fileUploadComponent = document.getElementById('hof-file-upload');
    const fileUploadErrorMsg = fileUploadComponent.querySelector('.govuk-error-message');
    switch (status) {
      case 'ready':
        if (fileUploadComponent) {
          fileUploadComponent.classList.remove('govuk-form-group--error');
        }
        if (fileUploadErrorMsg) {
          fileUploadErrorMsg.classList.add('govuk-!-display-none');
        }
        break;
      case 'error':
        if (fileUploadComponent) {
          fileUploadComponent.classList.add('govuk-form-group--error');
          document.getElementById(`upload-file-error-${errorType}`).classList.remove('govuk-!-display-none');
        }
        break;
      case 'uploading':
        uploadPageLoaderContainer.style.display = 'flex';
        fileUpload.disabled = true;
        fileUpload.setAttribute('aria-disabled', 'true');
        fileUploadSaveAndContinue.disabled = true;
        fileUploadSaveAndContinue.setAttribute('aria-disabled', 'true');
        break;
      default:
        break;
    }
  };

  if (fileUpload) {
    fileUpload.addEventListener('change', () => {
      fileUploadStatusHandler('ready');
      const fileInfo = fileUpload.files && fileUpload.files.length > 0 ? fileUpload.files[0] : null;
      if (fileInfo) {
        if (fileInfo.size > config.upload.maxFileSize) {
          fileUploadStatusHandler('error', 'maxFileSize');
          return;
        }
        if (!config.upload.allowedMimeTypes.includes(fileInfo.type) ) {
          fileUploadStatusHandler('error', 'fileType');
          return;
        }
      }

      document.querySelector('[name=file-upload-form]').submit();
      fileUploadStatusHandler('uploading');
    });
  }
});

$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});

// add error styling for select fields that are using accessible-autocomplete
const autocompleteDiv = $('.autocomplete__wrapper').parent();
if (autocompleteDiv.parent().hasClass('govuk-form-group--error')) {
  $('.autocomplete__input').addClass('autocomplete__input--error');
} else if (!autocompleteDiv.parent().hasClass('govuk-form-group--error')) {
  $('.autocomplete__input').removeClass('autocomplete__input--error');
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
