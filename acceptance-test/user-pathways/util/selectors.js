
'use strict';
const path = require('path');
const bootstrap = require('../../bootstrap/bootstrap');

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
const CURRENT_PV_LOCATION_UK_REGION = '#current-pv-location-uk-region';
const WHO_EXPLOITED_PV = '#who-exploited-pv';
const ANY_OTHER_PVS_NO_OPTION = '#any-other-pvs-no';
const PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION = '#reported-to-police-yes';
const REFER_CASE_TO_NRM_YES_OPTION = '#pv-want-to-submit-nrm-yes';
const DOES_PV_NEED_SUPPORT_NO_OPTION = '#does-pv-need-support-no';
const PV_NAME_REQUIRING_SUPPORT_FIRST_NAME = '#pv-name-that-requires-support-first-name';
const PV_NAME_REQUIRING_SUPPORT_LAST_NAME = '#pv-name-that-requires-support-last-name';
const PV_GENDER_MALE_OPTION = '#pv-gender-male';
const DOES_PV_HAVE_CHILDREN_NO_OPTION = '#does-pv-have-children-no';
const PV_NATIONALITY = '#pv-nationality';
const INTERPRETER_NO_OPTION = '#pv-interpreter-requirements-no';
const COMMUNICATION_AID_NO_OPTION = '#pv-other-help-with-communication-no';
const HO_REFERENCE_NO_OPTION = '#pv-ho-reference-no';
const PV_CONTACT_DETAILS_EMAIL_OPTION = '#pv-contact-details-email';
const PV_CONTACT_DETAILS_EMAIL_INPUT = '#pv-contact-details-email-input';
const PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION = '#pv-contact-details-email-check';
const PV_PHONE_NUMBER_NO_OPTION = '#pv-phone-number-no';
const POLICE_CONTACT_YES_OPTION = '#co-operate-with-police-yes';
const FR_DETAILS_NAME_INPUT = '#fr-details-name';
const FR_DETAILS_ROLE_INPUT = '#fr-details-role';
const FR_DETAILS_PHONE_INPUT = '#fr-details-phone';

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
    CURRENT_PV_LOCATION_UK_REGION,
    WHO_EXPLOITED_PV,
    ANY_OTHER_PVS_NO_OPTION,
    PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION,
    REFER_CASE_TO_NRM_YES_OPTION,
    DOES_PV_NEED_SUPPORT_NO_OPTION,
    PV_NAME_REQUIRING_SUPPORT_FIRST_NAME,
    PV_NAME_REQUIRING_SUPPORT_LAST_NAME,
    PV_GENDER_MALE_OPTION,
    DOES_PV_HAVE_CHILDREN_NO_OPTION,
    PV_NATIONALITY,
    INTERPRETER_NO_OPTION,
    COMMUNICATION_AID_NO_OPTION,
    HO_REFERENCE_NO_OPTION,
    PV_CONTACT_DETAILS_EMAIL_OPTION,
    PV_CONTACT_DETAILS_EMAIL_INPUT,
    PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION,
    PV_PHONE_NUMBER_NO_OPTION,
    POLICE_CONTACT_YES_OPTION,
    FR_DETAILS_NAME_INPUT,
    FR_DETAILS_ROLE_INPUT,
    FR_DETAILS_PHONE_INPUT,
};
