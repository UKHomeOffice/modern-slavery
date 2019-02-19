
'use strict';
const path = require('path');
const bootstrap = require('../../bootstrap/bootstrap');

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
const ORGANISATION_INPUT = '#user-organisation';
const WHAT_HAPPENED_INPUT = '#what-happened';
const LOCATION_ENGLAND_OPTION = '#fr-location-england';
const PV_UNDER_AGE_NO_OPTION = '#pv-under-age-no';
const PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION = '#pv-under-age-at-time-of-exploitation-no';
const EXPLOITED_IN_UK_OPTION = '#where-exploitation-happened-uk';

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

module.exports = {
    VIEWPORT,
    CONTINUE_BUTTON,
    ORGANISATION_INPUT,
    WHAT_HAPPENED_INPUT,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_2_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_4_YES_OPTION,
    EMAIL_INPUT,
    TEST_FILE_PATH,
    LOCATION_ENGLAND_OPTION,
    PV_UNDER_AGE_NO_OPTION,
    PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION,
    EXPLOITED_IN_UK_OPTION,
};
