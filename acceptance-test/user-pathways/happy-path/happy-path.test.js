/* eslint-disable no-undef */
'use strict';
const path = require('path');
const downloadPath = path.resolve('./acceptance-test/temp-downloads');
const bootstrap = require('../../bootstrap/bootstrap');
const config = require('../../test-config');
const pageActions = require('../util/page-actions');
const { clickSelector, focusThenType, navigateTo } = pageActions;

const {
  START_REPORT,
  CONTINUE_BUTTON,
  CONTINUE_BUTTON_EXPLOITATION_PAGE,
  DOWNLOAD_REPORT,
  REFERENCE_INPUT,
  ORGANISATION_INPUT,
  EMAIL_INPUT,
  PV_BIRTHPLACE,
  PV_FAMILY,
  PV_EDUCATION,
  PV_EMPLOYMENT_HISTORY,
  EXPLOITATION_TAKE_PLACE,
  MORE_THAN_ONE_SITUATION,
  HOW_DID_EXPLOITATION_START,
  WERE_TAKEN_SOMEWHERE_YES,
  WERE_TAKEN_SOMEWHERE_DETAILS,
  WHAT_WERE_THEY_REQUIRED_TO_DO,
  HOW_WERE_THEY_TREATED,
  WHY_THEY_STAYED,
  WHY_DID_THEY_LEAVE,
  FIRST_CHANCE_TO_REPORT_NO,
  WHY_REPORT_NOW,
  WHY_ARE_YOU_MAKING_REFERRAL,
  INTERVIEW_CARRIED_OUT,
  ARE_OTHERS_INVOLVED_YES,
  ARE_OTHERS_INVOLVED_DETAILS,
  EVIDENCE_OF_DISHONESTY_YES,
  EVIDENCE_OF_DISHONESTY_DETAILS,
  EVIDENCE_TO_SUBMIT,
  LOCATION_ENGLAND_OPTION,
  PV_UNDER_AGE_NO_OPTION,
  PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION,
  EXPLOITED_IN_UK_OPTION,
  CURRENT_PV_LOCATION_UK_CITY,
  CURRENT_PV_LOCATION_UK_REGION,
  WHO_EXPLOITED_PV,
  ANY_OTHER_PVS_NO_OPTION,
  PV_HAS_CRIME_REFERENCE_NUMBER_NO_OPTION,
  REFER_CASE_TO_NRM_YES_OPTION,
  DOES_PV_NEED_SUPPORT_YES_OPTION,
  PV_NAME_FIRST_NAME,
  PV_NAME_LAST_NAME,
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
  FR_DETAILS_FIRST_NAME_INPUT,
  FR_DETAILS_LAST_NAME_INPUT,
  FR_DETAILS_ROLE_INPUT,
  FR_DETAILS_PHONE_INPUT,
  FR_ALTERNATE_CONTACT_EMAIL_INPUT,
  PV_UNDER_AGE_YES_OPTION,
  LOCAL_AUTHORITY_NAME,
  LOCAL_AUTHORITY_PHONE,
  LOCAL_AUTHORITY_EMAIL,
  REFER_CASE_TO_NRM_NO_OPTION,
  HOW_WERE_THEY_EXPLOITED_FORCED_WORK_OPTION,
  WHO_CONTACT_PV_OPTION,
  EXPLOITED_IN_UK_CITY_INPUT,
  START_HOME_BUTTON
} = config.selectors;

const APP_CONTAINER_PORT = process.env.PORT || 8081;
let APP_CONTAINER_HOST;

let browser;
let page;

/**
 * .only method used to run only tests within this describe function
 * block. This can be removed if we wish to incorporate other tests in external
 * files
 */
describe.only('User path(s)', () => {
  beforeEach(async () => {
    const { browser: testBrowser, page: initialPage, hostIP } = await bootstrap.buildBrowser();

    browser = testBrowser;
    page = initialPage;
    APP_CONTAINER_HOST = hostIP;

    const initialUrl = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}`;

    /* Clear browser cookies before start of each test.
        This so we do not hit the invalid token page when running
        subsequent tests */
    await page._client.send('Network.clearBrowserCookies');
    await page.goto(initialUrl);
  });

  /**
     * Close browser to end tests.
     */
  after(async () => {
    await browser.close();
  });

  /**
     * Run a sequence of actions to simulate verification of a user
     *
     * @returns {Promise}
     */
  async function verifyUser() {
    await clickSelector(page, START_HOME_BUTTON);
    await page.focus(EMAIL_INPUT);
    await page.keyboard.type('sas-hof-test@digital.homeoffice.gov.uk');
    // Bypass user clicking email link - Notify Key will not be set during test runs
    await navigateTo(page, `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`);
  }

  /**
     * Run a sequence of actions to simulate user not opting to refer case to
     * the NRM
     *
     * @returns {Promise}
     */
  async function completeDutyToNotifyForm() {
    await clickSelector(page, REFER_CASE_TO_NRM_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, PV_GENDER_MALE_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, PV_NATIONALITY, 'French');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, POLICE_CONTACT_YES_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, PV_NAME_FIRST_NAME, 'Robert');
    await focusThenType(page, PV_NAME_LAST_NAME, 'Maxwell');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_OPTION);
    await focusThenType(page, PV_CONTACT_DETAILS_EMAIL_INPUT, 'robert.maxwell@pvrefuse.com');
    await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
  }

  /**
     * Run a sequence of actions to simulate the completion of the first half
     * of the NRM form
     *
     * The sequence of actions  in the form have been broken up into three functions
     * to reduce the number of statements within an asyncronous function in
     * order to reduce function complexity
     *
     * For additional information:
     * @see https://eslint.org/docs/rules/max-statements
     *
     *
     * @param {string} typeOfPV - type of Potential Victim 'child' or 'adult'
     * @param {bool} caseReferred - does the Potential Victim want their case
     * referred?
     *
     * @returns {Promise}
     */
  async function completeForm1of2(typeOfPV, caseReferred) {
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, START_REPORT);
    await focusThenType(page, REFERENCE_INPUT, 'REF12345');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, ORGANISATION_INPUT, 'Home Office - UK Border Force UKBF');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, LOCATION_ENGLAND_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);

    if (typeOfPV === 'adult') {
      await clickSelector(page, PV_UNDER_AGE_NO_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await clickSelector(page, PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
    } else {
      await clickSelector(page, PV_UNDER_AGE_YES_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await focusThenType(page, LOCAL_AUTHORITY_NAME, 'Crawley Borough Council');
      await focusThenType(page, LOCAL_AUTHORITY_PHONE, '020878546453');
      await focusThenType(page, LOCAL_AUTHORITY_EMAIL, 'test@authority.org');
      await clickSelector(page, CONTINUE_BUTTON);
    }

    await focusThenType(page, PV_BIRTHPLACE, 'Test input of birthplace');
    await focusThenType(page, PV_FAMILY, 'Test input of familty');
    await focusThenType(page, PV_EDUCATION, 'Test input of education');
    await focusThenType(page, PV_EMPLOYMENT_HISTORY, 'Test input of employment history');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, EXPLOITATION_TAKE_PLACE, 'Test input of exploitation location');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, MORE_THAN_ONE_SITUATION, 'Test input of more than on situation');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, HOW_DID_EXPLOITATION_START, 'Test input of start date');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, WERE_TAKEN_SOMEWHERE_YES);
    await focusThenType(page, WERE_TAKEN_SOMEWHERE_DETAILS, 'Test input of location details');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, WHAT_WERE_THEY_REQUIRED_TO_DO, 'Test input of what they were required to do');
    await focusThenType(page, HOW_WERE_THEY_TREATED, 'Test input of how they were treated');
    await focusThenType(page, WHY_THEY_STAYED, 'Test input of why they stayed');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, WHY_DID_THEY_LEAVE, 'Test input of why they left');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, FIRST_CHANCE_TO_REPORT_NO);
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, WHY_REPORT_NOW, 'Test input of why reporting now');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, WHY_ARE_YOU_MAKING_REFERRAL, 'Test input of reason for referral');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, INTERVIEW_CARRIED_OUT, 'Test input of interview information');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, ARE_OTHERS_INVOLVED_YES);
    await focusThenType(page, ARE_OTHERS_INVOLVED_DETAILS, 'Test input of other involved details');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, EVIDENCE_OF_DISHONESTY_YES);
    await focusThenType(page, EVIDENCE_OF_DISHONESTY_DETAILS, 'Test input of evidence of dishonesty details');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, EVIDENCE_TO_SUBMIT, 'Test input of evidence to submit');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, EXPLOITED_IN_UK_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, EXPLOITED_IN_UK_CITY_INPUT, 'Croydon');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, CURRENT_PV_LOCATION_UK_CITY, 'Bromley');
    await focusThenType(page, CURRENT_PV_LOCATION_UK_REGION, 'Kent');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, WHO_EXPLOITED_PV, 'Test details about exploiter(s)');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, HOW_WERE_THEY_EXPLOITED_FORCED_WORK_OPTION);
    await clickSelector(page, CONTINUE_BUTTON_EXPLOITATION_PAGE);
    await clickSelector(page, ANY_OTHER_PVS_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, PV_HAS_CRIME_REFERENCE_NUMBER_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);

    if (caseReferred && typeOfPV === 'adult') {
      await clickSelector(page, REFER_CASE_TO_NRM_YES_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await clickSelector(page, DOES_PV_NEED_SUPPORT_YES_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
    } else if (!caseReferred && typeOfPV === 'adult') {
      await completeDutyToNotifyForm();
    } else {
      await clickSelector(page, CONTINUE_BUTTON);
    }
  }

  /**
     * Run a sequence of actions to simulate the completion of the second half
     * of the NRM form
     *
     * The sequence of actions in the form have been broken up into two functions
     * to reduce the number of statements within an asyncronous function in
     * order to reduce function complexity
     *
     * For additional information:
     * @see https://eslint.org/docs/rules/max-statements
     *
     *
     *  @param {string} typeOfPV - type of Potential Victim 'child' or 'adult'
     *
     * @returns {Promise}
     */
  async function completeForm2of2(typeOfPV) {
    await focusThenType(page, PV_NAME_FIRST_NAME, 'Paul');
    await focusThenType(page, PV_NAME_LAST_NAME, 'Shortlands');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, PV_GENDER_MALE_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, DOES_PV_HAVE_CHILDREN_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, PV_NATIONALITY, 'English');
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, INTERPRETER_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, COMMUNICATION_AID_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);
    await clickSelector(page, HO_REFERENCE_NO_OPTION);
    await clickSelector(page, CONTINUE_BUTTON);

    if (typeOfPV === 'adult') {
      await clickSelector(page, WHO_CONTACT_PV_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_OPTION);
      await focusThenType(page, PV_CONTACT_DETAILS_EMAIL_INPUT, 'paul.shortlands@pv.com');
      await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await clickSelector(page, PV_PHONE_NUMBER_NO_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
      await clickSelector(page, POLICE_CONTACT_YES_OPTION);
      await clickSelector(page, CONTINUE_BUTTON);
    }

    await focusThenType(page, FR_DETAILS_FIRST_NAME_INPUT, 'Jack');
    await focusThenType(page, FR_DETAILS_LAST_NAME_INPUT, 'Smith');
    await focusThenType(page, FR_DETAILS_ROLE_INPUT, 'Police Officer');
    await focusThenType(page, FR_DETAILS_PHONE_INPUT, '02086757436');
    await clickSelector(page, CONTINUE_BUTTON);
    await focusThenType(page, FR_ALTERNATE_CONTACT_EMAIL_INPUT, 'jack.smith@police.com');
    await clickSelector(page, CONTINUE_BUTTON);
  }

  const timeoutInMins = num => num * 60000;
  const defaultTimeout = timeoutInMins(5);

  it('Happy path - Adult', async () => {
    try {
      await verifyUser();
      await completeForm1of2('adult', true);
      await completeForm2of2('adult');
    } catch (err) {
      throw new Error(err);
    }
  }).timeout(defaultTimeout);

  it('User path - Child', async () => {
    try {
      await verifyUser();
      await completeForm1of2('child', true);
      await completeForm2of2('child');
    } catch (err) {
      throw new Error(err);
    }
  }).timeout(defaultTimeout);

  it('User path - Duty to Notify (Adult)', async () => {
    try {
      await verifyUser();
      await completeForm1of2('adult', false);
    } catch (err) {
      throw new Error(err);
    }
  }).timeout(defaultTimeout);

  it('downloads the prompt sheet', async () => {
    try {
      await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
      });

      await clickSelector(page, DOWNLOAD_REPORT);
      await clickSelector(page, DOWNLOAD_REPORT);
      const pageContent = await page.content();
      const result = pageContent.includes('Not found');
      expect(result).to.be.false;
    } catch (err) {
      throw new Error(err);
    }
  }).timeout(defaultTimeout);
});
