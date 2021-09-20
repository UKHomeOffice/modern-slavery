'use strict';

/*
 * Validator methods should return false (or falsy value) for *invalid* input,
 * and should return true (or truthy value) for valid input.
 *
 * For more information, see https://github.com/UKHomeOfficeForms/hof-form-controller
 */

module.exports = {
  isValidEmail: email => [
    typeof email === 'string',
    email.split('@').length === 2,
    /^[^\s@]+@[^\.\s]+\.[^\s]+$/i.test(email)
  ].every(x => x)
};
