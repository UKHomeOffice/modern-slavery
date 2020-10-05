'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  aws: {
    sqs: process.env.AWS_SQS
  },
  reports: {
    deletionTimeout: process.env.DELETION_TIMEOUT || 28,
    alertTimeout: process.env.FIRST_ALERT_TIMEOUT || 7
  },
  audit: {
    enabled: process.env.AUDIT_DATA || false,
    host: process.env.AUDIT_DB_HOST,
    user: process.env.AUDIT_DB_USER,
    password: process.env.AUDIT_DB_PASS,
    database: process.env.AUDIT_DB_NAME
  },
  prometheusPort: 8082,
  env: env,
  useMocks: useMocks,
  allowSkip: process.env.allowSkip,
  writeToCasework: (process.env.WRITE_TO_CASEWORK === 'true') ? true : false,
  hostUrl: process.env.HOST_URL || 'http://localhost:8081',
  saveService: {
    port: process.env.DATASERVICE_SERVICE_PORT_HTTPS || '3000',
    host: process.env.DATASERVICE_SERVICE_HOST &&
      `https://${process.env.DATASERVICE_SERVICE_HOST}` || 'http://127.0.0.1'
  },
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
    templateUserAuthId: process.env.TEMPLATE_USER_AUTHORISATION_ID || 'fe0408cb-24f0-4b5f-9bdb-6569834039fb',
    templateFeedback: process.env.TEMPLATE_FEEDBACK || '92b314e9-8ed5-4762-a8e2-7f208cdf3836',
    caseworkerEmail: process.env.CASEWORKER_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk',
    feedbackEmail: process.env.FEEDBACK_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk'
  },
  selectors: {
    START_HOME_BUTTON: '#content > div > form > div > div.govuk-grid-column-two-thirds > input',
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
    EXPLOITED_IN_UK_CITY_INPUT: '#where-exploitation-happened-uk-city-1',
  }
};
