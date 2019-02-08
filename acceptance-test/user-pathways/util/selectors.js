
'use strict';
const path = require('path');
const bootstrap = require('../../bootstrap/bootstrap');
const getOptions = require('../util/options');

const VIEWPORT = { width: 1920, height: 1080 };
const CONTINUE_BUTTON = '#content > div > form > input.button';
const UPLOAD_DOCUMENT_PAGE_2_YES_OPTION = '#supporting-documents-add-yes';
const UPLOAD_DOCUMENT_PAGE_2_NO_OPTION = '#supporting-documents-add-no';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT = '#supporting-document-upload';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION = '#supporting-document-description';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON = '#content > div > form > p > input';
const UPLOAD_DOCUMENT_PAGE_4_NO_OPTION = '#supporting-documents-add-another-no';
const UPLOAD_DOCUMENT_PAGE_4_YES_OPTION = '#supporting-documents-add-another-yes';
const EMAIL_INPUT = '#user-email';

/**
 * Get the test file path
 *
 * If the browser is on the local machine then get the file from the upload file
 * directory otherwise get the file from the root of the container in which the
 * browser is running
 *.
 * @returns {string} - The test file path
 */
const TEST_FILE_PATH = () => {
    return !bootstrap.getTestEnvironmentOptions().isLocalTest ?
    path.resolve('/test.png')
    : path.resolve(__dirname, '../upload-file/images/test.png');
};

/**
 * Select the option on the specified page using the option's name
 *
 * @param {string} page - the page url (e.g 'select-location')
 * @param {string} optionName - the option selected
 *
 * @returns {string} - the selector for the page option specified
 */
const getOptionSelectorWithName = (page, optionName) => {
    return `#${page}-${optionName}`;
};

/**
 * Get selector for option on specified page using the option's index number
 *
 * If the option returned by 'getOptions' is not a string then use the value
 * attribute of the object as the option value
 *
 * @param {string} page - the page url (e.g 'select-location')
 * @param {number} index -  index position of option on page
 *
 * @returns {string} - the selector for the page option required
 */
const getOptionSelectorWithIndex = (page, index) => {
    const option = getOptions(page)[index];

    if (typeof option !== 'string') {
        return getOptionSelectorWithName(page, option.value);
    }

    return getOptionSelectorWithName(page, option);
};

module.exports = {
    VIEWPORT,
    CONTINUE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_2_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_4_YES_OPTION,
    EMAIL_INPUT,
    TEST_FILE_PATH,
    getOptionSelectorWithIndex,
};
