
'use strict';
const path = require('path');
const bootstrap = require('../../bootstrap/bootstrap');

const VIEWPORT = { width: 1920, height: 1080 };
const CONTINUE_BUTTON = '#content > div > form > input.button';
const UPLOAD_DOCUMENT_PAGE_2_YES_OPTION = '#supporting-documents-add-yes';
const UPLOAD_DOCUMENT_PAGE_2_NO_OPTION = '#supporting-documents-add-no';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR = '#supporting-document-upload';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR = '#supporting-document-description';
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
 * Select the location of the First responder
 *
 * @param {string} location - the location of the first responder
 *
 * @returns {string} - the selector for the location
 */
const SELECT_LOCATION = (location) => {
    return `#select-location-${location}`;
};

module.exports = {
    VIEWPORT,
    CONTINUE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_2_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_4_YES_OPTION,
    EMAIL_INPUT,
    TEST_FILE_PATH,
    SELECT_LOCATION,
};
