'use strict';

/**
 * Capitalise first letter of string
 *
 * @param {*} inputString - string input
 *
 * @returns {string} - input string with the first letter capitalised
 */
const capitaliseFirstLetter = (inputString) => {
  if (inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return '';
};

module.exports = {
  capitaliseFirstLetter,
};
