'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  env: env,
  useMocks: useMocks,
  hostUrl: process.env.HOST_URL || 'http://localhost:8081',
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  upload: {
    maxFileSize: '100mb',
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://${localhost()}/api/file-upload`
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  tokenExpiry: 86400,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY || '',
    templateUserAuthId: '56b5a84f-7024-41d3-bd08-26521435be16',
    templatePDF: '0ff859d5-4991-4d73-99ad-2ada9048a927',
    caseworkerEmail: process.env.CASEWORKER_EMAIL || 'ms-test@homeoffice.gov.uk'
  },
  pdf: {
    template: './apps/nrm/views/pdf.html',
    // problems with creating temp folder so use images folder
    tempLocation: 'public/images'
  },
  selectors: {
    CONTINUE_BUTTON: '#content > div > form > input.button',
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION: '#supporting-documents-add-yes',
    UPLOAD_DOCUMENT_PAGE_2_NO_OPTION: '#supporting-documents-add-no',
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT: '#supporting-document-upload',
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION: '#supporting-document-description',
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON: '#content > div > form > p > input',
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION: '#supporting-documents-add-another-no',
    UPLOAD_DOCUMENT_PAGE_4_YES_OPTION: '#supporting-documents-add-another-yes',
    EMAIL_INPUT: '#user-email',
    ORGANISATION_INPUT: '#user-organisation',
    WHAT_HAPPENED_INPUT: '#what-happened',
    LOCATION_ENGLAND_OPTION: '#fr-location-england',
    PV_UNDER_AGE_NO_OPTION: '#pv-under-age-no',
    PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION: '#pv-under-age-at-time-of-exploitation-no',
    EXPLOITED_IN_UK_OPTION: '#where-exploitation-happened-uk',
    CURRENT_PV_LOCATION_UK_CITY: '#current-pv-location-uk-city',
    CURRENT_PV_LOCATION_UK_REGION: '#current-pv-location-uk-region',
    WHO_EXPLOITED_PV: '#who-exploited-pv',
    ANY_OTHER_PVS_NO_OPTION: '#any-other-pvs-no',
    PV_HAS_CRIME_REFERENCE_NUMBER_NO_OPTION: '#reported-to-police-no',
    REFER_CASE_TO_NRM_YES_OPTION: '#pv-want-to-submit-nrm-yes',
    DOES_PV_NEED_SUPPORT_YES_OPTION: '#does-pv-need-support-yes',
    PV_NAME_FIRST_NAME: '#pv-name-first-name',
    PV_NAME_LAST_NAME: '#pv-name-last-name',
    PV_GENDER_MALE_OPTION: '#pv-gender-male',
    DOES_PV_HAVE_CHILDREN_NO_OPTION: '#does-pv-have-children-no',
    PV_NATIONALITY: '#pv-nationality',
    INTERPRETER_NO_OPTION: '#pv-interpreter-requirements-no',
    COMMUNICATION_AID_NO_OPTION: '#pv-other-help-with-communication-no',
    HO_REFERENCE_NO_OPTION: '#pv-ho-reference-no',
    PV_CONTACT_DETAILS_EMAIL_OPTION: '#pv-contact-details-email',
    PV_CONTACT_DETAILS_EMAIL_INPUT: '#pv-contact-details-email-input',
    PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION: '#pv-contact-details-email-check',
    PV_PHONE_NUMBER_NO_OPTION: '#pv-phone-number-no',
    POLICE_CONTACT_YES_OPTION: '#co-operate-with-police-yes',
    FR_DETAILS_NAME_INPUT: '#fr-details-name',
    FR_DETAILS_ROLE_INPUT: '#fr-details-role',
    FR_DETAILS_PHONE_INPUT: '#fr-details-phone',
    FR_ALTERNATE_CONTACT_EMAIL_INPUT: '#fr-alternative-contact',
    PV_UNDER_AGE_YES_OPTION: '#pv-under-age-yes',
    LOCAL_AUTHORITY_NAME: '#local-authority-contacted-about-child-local-authority-name',
    LOCAL_AUTHORITY_PHONE: '#local-authority-contacted-about-child-local-authority-phone',
    LOCAL_AUTHORITY_EMAIL: '#local-authority-contacted-about-child-local-authority-email',
    REFER_CASE_TO_NRM_NO_OPTION: '#pv-want-to-submit-nrm-no',
    HOW_WERE_THEY_EXPLOITED_FORCED_WORK_OPTION: '#types-of-exploitation-forced-to-work',
    WHO_CONTACT_PV_OPTION: '#who-contact-potential-victim',
    FR_DETAILS_FIRST_NAME_INPUT: '#fr-details-first-name',
    FR_DETAILS_LAST_NAME_INPUT: '#fr-details-last-name',
    EXPLOITED_IN_UK_CITY_INPUT: '#where-exploitation-happened-uk-city',
    EXPLOITED_IN_UK_REGION_INPUT: '#where-exploitation-happened-uk-region',
  }
};
