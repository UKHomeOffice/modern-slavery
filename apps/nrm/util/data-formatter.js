'use strict';
const config = require('../../../config');

/**
 * Capitalise all characters or leave as is depending on
 * options supplied
 *
 * @param {object} wordAttributes - object word with attributes that dictate
 * what type of capitalisation formatting to be applied
 *
 * @returns {string} - string with the supplied capitalisation formatting applied
 */
const capitaliseWord = wordAttributes => {
  const { word, allCaps } = wordAttributes;

  if (allCaps) {
    return word.toUpperCase();
  }

  return word;
};

/**
 * Capitalise the first letter or the first letter of each word (Title Case)
 * If word is in excluded list then do not apply capitalisation
 *
 * @param {object} text - text to be capitalised
 * @param {bool} [all=false] - whether the first letter of each word is capitalised
 * @param {array} [exceptions=[]] - array of word objects to be either excluded
 * from capitalisation for example: [{word: 'and', allCaps: false }]
 * or the entire word to be capitalised for example: [{ word: 'uk', allCaps: true }]
 *
 * @returns {string} - capitalised text
 */
const capitaliseText = (text, all = false, exceptions = []) => {
  const capitalisedText = text.charAt(0).toUpperCase() + text.slice(1);

  if (all) {
    const splitString = text.toLowerCase().split(' ');

    for (let splitStringIndex = 0; splitStringIndex < splitString.length; splitStringIndex++) {
      let matchedException = false;

      // Loop through exceptions to see if word should be formatted differently
      for (let exceptionsIndex = 0; exceptionsIndex < exceptions.length; exceptionsIndex++) {
        if (exceptions[exceptionsIndex].word === splitString[splitStringIndex]) {
          matchedException = true;
          splitString[splitStringIndex] = capitaliseWord(exceptions[exceptionsIndex]);
        }
      }

      // Capitalise first letter
      if (!matchedException) {
        splitString[splitStringIndex] = splitString[splitStringIndex]
          .charAt(0)
          .toUpperCase() + splitString[splitStringIndex]
          .substring(1);
      }
    }

    return splitString.join(' ');
  }

  return capitalisedText;
};

/**
 * Remove dashes from text
 *
 * @param {Object} text - text to be formatted
 *
 * @returns {string} - the text without dashes
 */
const removeDashesFromText = text => {
  const strippedDashes = text.replace(/-/g, ' ');

  return strippedDashes;
};

const truncateText = text => {
  const size = 300;
  const truncatedText = text.substring(0, size);

  return truncatedText;
};

/**
 * Formatter for full date strings using application-configured locale and format.
 * Used for consistent pretty date output across the app (e.g., "11 February 2026").
 */
const PRETTY_DATE_FORMATTER = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

/**
 * Determines whether a value represents a valid date.
 * Accepts a Date instance or a parseable date string.
 *
 * @param {Date|string} date - A Date object or a date string parseable by Date.parse.
 * @returns {boolean} True if the value resolves to a valid date; otherwise false.
 */
const isValidDate = date => {
  return (
    (date instanceof Date && !isNaN(date)) ||
    (typeof date === 'string' && !isNaN(Date.parse(date)))
  );
};

/**
 * Formats a date using the configured pretty date formatter.
 * The format and locales are derived from application configuration.
 *
 * @param {Date|string} date - A Date object or a parseable date string.
 * @returns {string} The formatted date string.
 * @throws {Error} If the input is not a valid date or formatting fails.
 * @example
 * // en-GB with { day: 'numeric', month: 'long', year: 'numeric' }
 * // Returns '11 February 2026' for the date 2026-02-11
 * formatDate('2026-02-11');
 */
const formatDate = date => {
  if (!isValidDate(date)) {
    throw new Error('Invalid date value');
  }

  try {
    const dateObj = new Date(date);
    return PRETTY_DATE_FORMATTER.format(dateObj);
  } catch (error) {
    throw new Error(
      `Error formatting date to formatDate format: ${error.message}`
    );
  }
};

module.exports = {
  capitaliseText,
  removeDashesFromText,
  truncateText,
  formatDate
};
