$ = window.jQuery;

// Modal dialog prototype
window.GOVUK.sessionDialog = {
  el: document.getElementById('js-modal-dialog'),
  $el: $('#js-modal-dialog'),
  $lastFocusedEl: null,
  $closeButton: $('#timeout-continue-button'),
  //$closeButton: $('.modal-dialog .js-dialog-close'),
  dialogIsOpenClass: 'dialog-is-open',
  timers: [],
  warningTextPrefix: 'We will reset your application if you do not respond in ',
  warningTextSuffix: '.',
  warningTextExtra: ' We do this to keep your information secure.',

  // Timer specific markup. If these are not present, timeout and redirection are disabled
  $timer: $('#js-modal-dialog .timer'),
  $accessibleTimer: $('#js-modal-dialog .at-timer'),

  secondsSessionTimeout: parseInt($('#js-modal-dialog').data('session-timeout') || 1800),
  secondsTimeoutWarning: parseInt($('#js-modal-dialog').data('session-timeout-warning') || 300),
  secondsFinalWarning: parseInt($('#js-modal-dialog').data('session-timeout-final-warning') || 4),
  timeoutRedirectUrl: $('#js-modal-dialog').data('url-redirect'),
  timeSessionRefreshed: new Date(),

  bindUIElements: function () {
    window.GOVUK.sessionDialog.$closeButton.on('click', function (e) {
      //e.preventDefault(); // meaning that the default action that belongs to the event will not occur.
      window.GOVUK.sessionDialog.closeDialog()
    });

    // Close modal when ESC pressed
    $(document).keydown(function (e) {
      if (window.GOVUK.sessionDialog.isDialogOpen() && e.keyCode === 27) {
        window.GOVUK.sessionDialog.closeDialog()
      }
    })

  },

  isDialogOpen: function () {
    return window.GOVUK.sessionDialog.el['open']
  },

  isConfigured: function () {
    return window.GOVUK.sessionDialog.$timer.length > 0 &&
      window.GOVUK.sessionDialog.$accessibleTimer.length > 0 &&
      window.GOVUK.sessionDialog.secondsSessionTimeout &&
      window.GOVUK.sessionDialog.secondsTimeoutWarning &&
      window.GOVUK.sessionDialog.timeoutRedirectUrl
  },

  openDialog: function () {
    if (!window.GOVUK.sessionDialog.isDialogOpen()) {
      $('html, body').addClass(window.GOVUK.sessionDialog.dialogIsOpenClass);
      window.GOVUK.sessionDialog.saveLastFocusedEl();
      window.GOVUK.sessionDialog.makePageContentInert();
      window.GOVUK.sessionDialog.el.showModal()
    }
  },

  closeDialog: function () {
    if (window.GOVUK.sessionDialog.isDialogOpen()) {
      $('html, body').removeClass(window.GOVUK.sessionDialog.dialogIsOpenClass);
      window.GOVUK.sessionDialog.el.close();
      window.GOVUK.sessionDialog.setFocusOnLastFocusedEl();
      window.GOVUK.sessionDialog.removeInertFromPageContent();
      window.GOVUK.sessionDialog.refreshSession()
    }
  },

  saveLastFocusedEl: function () {
    window.GOVUK.sessionDialog.$lastFocusedEl = document.activeElement;
    if (!window.GOVUK.sessionDialog.$lastFocusedEl || window.GOVUK.sessionDialog.$lastFocusedEl === document.body) {
      window.GOVUK.sessionDialog.$lastFocusedEl = null
    } else if (document.querySelector) {
      window.GOVUK.sessionDialog.$lastFocusedEl = document.querySelector(':focus')
    }
  },

  // Set focus back on last focused el when modal closed
  setFocusOnLastFocusedEl: function () {
    if (window.GOVUK.sessionDialog.$lastFocusedEl) {
      window.setTimeout(function () {
        window.GOVUK.sessionDialog.$lastFocusedEl.focus()
      }, 0)
    }
  },

  // Set page content to inert to indicate to screenreaders it's inactive
  // NB: This will look for #content for toggling inert state
  makePageContentInert: function () {
    if (document.querySelector('#content')) {
      document.querySelector('#content').inert = true;
      document.querySelector('#content').setAttribute('aria-hidden', 'true')
    }
  },

  // Make page content active when modal is not open
  // NB: This will look for #content for toggling inert state
  removeInertFromPageContent: function () {
    if (document.querySelector('#content')) {
      document.querySelector('#content').inert = false;
      document.querySelector('#content').setAttribute('aria-hidden', 'false')
    }
  },

  numberToWords: function (n) {
    var string = n.toString();
    var units;
    var tens;
    var scales;
    var start;
    var end;
    var chunks;
    var chunksLen;
    var chunk;
    var ints;
    var i;
    var word;
    var words = 'and';

    if (parseInt(string) === 0) {
      return 'zero'
    }

    /* Array of units as words */
    units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];

    /* Array of tens as words */
    tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

    /* Array of scales as words */
    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion',
      'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion',
      'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion',
      'vigintillion', 'centillion' ];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end))
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return ''
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word)
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word)
        }

        /* Add tens word if array item exists */
        if ((word = tens[ ints[1] ])) {
          words.push(word)
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred')
        }
      }
    }
    return words.reverse().join(' ')
  },

  // Attempt to convert numerics into text as OS VoiceOver
  // occasionally stalled when encountering umbers
  timeToWords: function(t, unit) {
    var words;
    if (t > 0) {
      try {
          words = window.GOVUK.sessionDialog.numberToWords(t)
      } catch (e) {
          words = t
      }
      words = words + ' ' + window.GOVUK.sessionDialog.pluralise(t, unit)
    } else {
      words = ''
    }
    return words
  },

  pluralise: function(n, unit) {
    return n == 1 ? unit : unit + 's'
  },

  numericSpan: function(n, unit) {
    return '<span class="tabular-numbers">' + n + '</span> ' + window.GOVUK.sessionDialog.pluralise(n, unit)
  },

  countdownText: function(minutes, seconds) {
      var minutesText = window.GOVUK.sessionDialog.numericSpan(minutes, 'minute');
      var secondsText = window.GOVUK.sessionDialog.numericSpan(seconds, 'second');
      return minutes > 0 ? minutesText + (minutes == 1 && seconds == 0 ? '' : ' ' + secondsText) : secondsText
  },

  countdownAtText: function(minutes, seconds) {
      var minutesText = window.GOVUK.sessionDialog.timeToWords(minutes, 'minute');
      var secondsText = window.GOVUK.sessionDialog.timeToWords(seconds, 'second');
      return minutes > 0 ? minutesText + (seconds > 0 ? ' and ' + secondsText : '') : secondsText
  },

  startCountdown: function() {
    var $timer = window.GOVUK.sessionDialog.$timer;
    var $accessibleTimer = window.GOVUK.sessionDialog.$accessibleTimer;
    var timerRunOnce = false;
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    var seconds = window.GOVUK.sessionDialog.secondsUntilSessionTimeout();
    var minutes = seconds / 60;

    $timer.text(minutes + ' minute' + (minutes > 1 ? 's' : ''));

    (function countdown () {

      var secondsUntilSessionTimeout = window.GOVUK.sessionDialog.secondsUntilSessionTimeout();
      var timerExpired = secondsUntilSessionTimeout <= window.GOVUK.sessionDialog.secondsFinalWarning;

        if (!timerExpired) {

          var minutesLeft = parseInt(secondsUntilSessionTimeout / 60, 10);
          var secondsLeft = parseInt(secondsUntilSessionTimeout % 60, 10);

          var atMinutesText = window.GOVUK.sessionDialog.timeToWords(minutesLeft, 'minute');
          var atSecondsText = window.GOVUK.sessionDialog.timeToWords(secondsLeft, 'second');

          // Below string will get read out by screen readers every time
          // the timeout refreshes (every 15 secs. See below).
          // Please add additional information in the modal body content
          // or in below extraText which will get announced to AT the
          // first time the time out opens
          var countdownText = window.GOVUK.sessionDialog.countdownText(minutesLeft, secondsLeft);
          var text = window.GOVUK.sessionDialog.warningTextPrefix + '<strong>' + countdownText + '</strong>'
            + window.GOVUK.sessionDialog.warningTextSuffix;
          var countdownAtText = window.GOVUK.sessionDialog.countdownAtText(minutesLeft, secondsLeft);
          var atText = window.GOVUK.sessionDialog.warningTextPrefix + countdownAtText
            + window.GOVUK.sessionDialog.warningTextSuffix;
          var extraText = ' ' + window.GOVUK.sessionDialog.warningTextExtra;

          $timer.html(text + ' ' + extraText);

          // Update screen reader friendly content every 15 secs
          if (secondsLeft % 15 === 0) {

            // Read out the extra content only once.
            // Don't read out on iOS VoiceOver which stalls on the longer text
            if (!timerRunOnce && !iOS) {
                $accessibleTimer.text(atText + extraText);
                timerRunOnce = true
            } else {
                $accessibleTimer.text(atText)
            }
          }

          window.GOVUK.sessionDialog.addTimer(countdown, 1)
        }
    })()
  },

  finalWarning: function() {
    var $timer = window.GOVUK.sessionDialog.$timer;
    var $accessibleTimer = window.GOVUK.sessionDialog.$accessibleTimer;
    $accessibleTimer.attr('aria-live', 'assertive');
    $timer.text('You are about to be redirected');
    $accessibleTimer.text('You are about to be redirected')
  },

  // Clears all timers
  clearTimers: function () {
    for (var i = 0; i < window.GOVUK.sessionDialog.timers.length; i++) {
      clearTimeout(window.GOVUK.sessionDialog.timers[i])
    }
  },

  refreshSession: function () {
    $.get("");
    window.GOVUK.sessionDialog.timeSessionRefreshed = new Date();
    window.GOVUK.sessionDialog.controller()
  },

  redirect: function () {
    window.location = window.GOVUK.sessionDialog.timeoutRedirectUrl
  },

  // JS doesn't allow resetting timers globally so timers need
  // to be retained for resetting.
  addTimer: function(f, seconds) {
    window.GOVUK.sessionDialog.timers.push(setTimeout(f, seconds * 1000))
  },

  secondsSinceRefresh: function() {
    return Math.round(Math.abs((window.GOVUK.sessionDialog.timeSessionRefreshed - new Date()) / 1000))
  },

  secondsUntilSessionTimeout: function() {
    return window.GOVUK.sessionDialog.secondsSessionTimeout - window.GOVUK.sessionDialog.secondsSinceRefresh()
  },

  secondsUntilTimeoutWarning: function() {
    return window.GOVUK.sessionDialog.secondsUntilSessionTimeout() - window.GOVUK.sessionDialog.secondsTimeoutWarning
  },

  secondsUntilFinalWarning: function() {
    return window.GOVUK.sessionDialog.secondsUntilSessionTimeout() - window.GOVUK.sessionDialog.secondsFinalWarning
  },

  // countdown controller logic
  controller: function() {
    window.GOVUK.sessionDialog.clearTimers();
    var secondsUntilSessionTimeout = window.GOVUK.sessionDialog.secondsUntilSessionTimeout();

    //timed out - redirect
    if (secondsUntilSessionTimeout <= 0) {
      window.GOVUK.sessionDialog.redirect()
    }

    //final warning - show timeout imminent warning and schedule redirect
    else if (secondsUntilSessionTimeout <= window.GOVUK.sessionDialog.secondsFinalWarning) {
      window.GOVUK.sessionDialog.openDialog();
      window.GOVUK.sessionDialog.finalWarning();
      window.GOVUK.sessionDialog.addTimer(window.GOVUK.sessionDialog.controller,
        window.GOVUK.sessionDialog.secondsUntilSessionTimeout())
    }

    //timeout warning - show countdown and schedule imminent warning
    else if (secondsUntilSessionTimeout <= window.GOVUK.sessionDialog.secondsTimeoutWarning) {
      window.GOVUK.sessionDialog.openDialog();
      window.GOVUK.sessionDialog.startCountdown();
      window.GOVUK.sessionDialog.addTimer(window.GOVUK.sessionDialog.controller,
        window.GOVUK.sessionDialog.secondsUntilFinalWarning())
    }

    //wait for warning
    else {
      window.GOVUK.sessionDialog.addTimer(window.GOVUK.sessionDialog.controller,
        window.GOVUK.sessionDialog.secondsUntilTimeoutWarning())
    }
  },

  init : function(options) {
    $.extend(window.GOVUK.sessionDialog, options);
    if (window.GOVUK.sessionDialog.el && window.GOVUK.sessionDialog.isConfigured()) {
      // Native dialog is not supported by browser so use polyfill
      if (typeof HTMLDialogElement !== 'function') {
        window.dialogPolyfill.registerDialog(window.GOVUK.sessionDialog.el)
      }
      window.GOVUK.sessionDialog.bindUIElements();
      window.GOVUK.sessionDialog.controller();
    }
  }
};

window.GOVUK = GOVUK;
