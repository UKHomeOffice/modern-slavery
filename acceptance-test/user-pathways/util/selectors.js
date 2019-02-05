
'use strict';
const path = require('path');
const bootstrap = require('../../bootstrap/bootstrap');

const VIEWPORT = { width: 1920, height: 1080 };
const START_BUTTON_SELECTOR = '#content > div > form > input.button';
const UPLOAD_DOCUMENT_PAGE_2_YES_OPTION = '#supporting-documents-add-yes';
const UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON = '#content > div > form > input.button';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR = '#supporting-document-upload';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR = '#supporting-document-description';
const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON = '#content > div > form > p > input';
const UPLOAD_DOCUMENT_PAGE_4_NO_OPTION = '#supporting-documents-add-another-no';
const UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON = '#content > div > form > input.button';
const CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON = '#content > div > form > input.button';
const TEST_FILE_PATH = () => {
    return !bootstrap.getTestEnvironmentOptions().isLocalTest ?
    path.resolve('/test.png')
    : path.resolve(__dirname, '../upload-file/images/test.png');
};

module.exports = {
    VIEWPORT,
    START_BUTTON_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON,
    CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON,
    TEST_FILE_PATH,
};
