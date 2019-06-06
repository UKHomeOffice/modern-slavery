'use strict';

/**
 * Capitalise all characters or leave as is depending on
 * options supplied
 *
 * @param {object} wordAttributes - object word with attributes that dictate
 * what type of capitalisation formatting to be applied
 *
 * @returns {string} - string with the supplied capitalisation formatting applied
 */
const capitaliseWord = (wordAttributes) => {
  const { word, allCaps} = wordAttributes;

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
    let splitString = text.toLowerCase().split(' ');

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
const removeDashesFromText = (text) => {
  const strippedDashes = text.replace(/-/g, ' ');

  return strippedDashes;
};

module.exports = {
  capitaliseText,
  removeDashesFromText,
};
