'use strict';

/**
 * Capitalise the first letter or the first letter of each word (Title Case)
 *
 * @param {Object} text - text to be capitalised
 * @param {bool} [all=false] - whether the first letter of each word is capitalised
 *
 * @returns {string} - capitalised text
 */
const capitaliseText = (text, all = false) => {
  const capitalisedText = text.charAt(0).toUpperCase() + text.slice(1);

  if (all) {
    const splitString = text.toLowerCase().split(' ');
    for (let i = 0; i < splitString.length; i++) {
      splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
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
  const strippedDashes = text.replace('-', ' ');

  return strippedDashes;
};

module.exports = {
  capitaliseText,
  removeDashesFromText
};
