'use strict';
const bootstrap = require('../../bootstrap/bootstrap');
const path = require('path');
const config = require('../../../config');
const pageActions = require('../util/page-actions');
const { clickSelector, navigateTo, uploadFile } = pageActions;

const {
    CONTINUE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    EMAIL_INPUT,
    ORGANISATION_INPUT,
    LOCATION_ENGLAND_OPTION,
    PV_UNDER_AGE_NO_OPTION,
    PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION,
    WHAT_HAPPENED_INPUT,
    EXPLOITED_IN_UK_OPTION,
    CURRENT_PV_LOCATION_UK_REGION,
    WHO_EXPLOITED_PV,
    ANY_OTHER_PVS_NO_OPTION,
    PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION,
    REFER_CASE_TO_NRM_YES_OPTION,
    DOES_PV_NEED_SUPPORT_YES_OPTION,
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
    FR_ALTERNATE_CONTACT_EMAIL_INPUT,
} = config.selectors;

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

const APP_CONTAINER_PORT = process.env.PORT || 8081;
let APP_CONTAINER_HOST;

let browser;
let page;

describe('Upload File(s)', () => {
    beforeEach(async() => {
        let { browser: testBrowser, page: initialPage, hostIP } = await bootstrap.buildBrowser();

        browser = testBrowser;
        page = initialPage;

        APP_CONTAINER_HOST = hostIP;

        const initialUrl = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}`;

        await page.goto(initialUrl);
    });

    afterEach(async() => {
        await page.close();
    });

    after(async() => {
        await browser.close();
    });

     /**
     * Run a sequence of actions to simulate verification of a user
     *
     * The sequence of actions have been broken up into three functions
     * to reduce the number of statements within an asyncronous function in
     * order to reduce function complexity
     *
     * For additional information:
     * @see https://eslint.org/docs/rules/max-statements
     *
     * @returns {Promise}
     */
    async function verifyUser() {
        await clickSelector(page, CONTINUE_BUTTON);
        await page.$eval(ORGANISATION_INPUT, (element) => {
            element.value = 'Barnardos';
        });
        await page.$eval(EMAIL_INPUT, (element) => {
            element.value = 'test.user@homeoffice.gov.uk';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // Bypass user clicking email link - Notify Key will not be set during test runs
        await navigateTo(page, `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`);
    }

    /**
     * Run a sequence of actions to simulate the completion of the first half
     * of the NRM form
     *
     * The sequence of actions have been broken up into three functions
     * to reduce the number of statements within an asyncronous function in
     * order to reduce function complexity
     *
     * For additional information:
     * @see https://eslint.org/docs/rules/max-statements
     *
     * @returns {Promise}
     */
    async function completeFormUptoX() {
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, LOCATION_ENGLAND_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_UNDER_AGE_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await page.$eval(WHAT_HAPPENED_INPUT, (element) => {
            element.value = 'Test input regarding details of exploitation';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, EXPLOITED_IN_UK_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await page.$eval(CURRENT_PV_LOCATION_UK_REGION, (element) => {
            element.value = 'Rutland';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await page.$eval(WHO_EXPLOITED_PV, (element) => {
            element.value = 'Test details about exploiter(s)';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, ANY_OTHER_PVS_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, REFER_CASE_TO_NRM_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
    }

    /**
     * Run a sequence of actions to simulate the completion of the second half
     * of the NRM form
     *
     * The sequence of actions have been broken up into three functions
     * to reduce the number of statements within an asyncronous function in
     * order to reduce function complexity
     *
     * For additional information:
     * @see https://eslint.org/docs/rules/max-statements
     *
     * @returns {Promise}
     */
    async function completeFormFromXtoY() {
        await clickSelector(page, DOES_PV_NEED_SUPPORT_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await page.waitForSelector(PV_NAME_REQUIRING_SUPPORT_FIRST_NAME);
        await page.$eval(PV_NAME_REQUIRING_SUPPORT_FIRST_NAME, (element) => {
            element.value = 'Jack';
        });
        await page.$eval(PV_NAME_REQUIRING_SUPPORT_LAST_NAME, (element) => {
            element.value = 'Smith';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_GENDER_MALE_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, DOES_PV_HAVE_CHILDREN_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await page.waitForSelector(PV_NATIONALITY);
        await page.$eval(PV_NATIONALITY, (element) => {
            element.value = 'United Kingdom';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, INTERPRETER_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, COMMUNICATION_AID_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, HO_REFERENCE_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_OPTION);
        await page.waitForSelector(PV_CONTACT_DETAILS_EMAIL_INPUT);
        await page.$eval(PV_CONTACT_DETAILS_EMAIL_INPUT, (element) => {
            element.value = 'Test@test.com';
        });
        await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, PV_PHONE_NUMBER_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, POLICE_CONTACT_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await uploadFile(page, UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT, TEST_FILE_PATH());
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION, (element) => {
            element.value = 'NRM Test File example';
        });
        await clickSelector(page, UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);
        await clickSelector(page, UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        await page.waitForSelector(FR_DETAILS_NAME_INPUT);
        await page.$eval(FR_DETAILS_NAME_INPUT, (element) => {
            element.value = 'Francis Drake';
        });
        await page.$eval(FR_DETAILS_ROLE_INPUT, (element) => {
            element.value = 'Police Officer';
        });
        await page.$eval(FR_DETAILS_PHONE_INPUT, (element) => {
            element.value = '020879865645';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await page.waitForSelector(FR_ALTERNATE_CONTACT_EMAIL_INPUT);
        await page.$eval(FR_ALTERNATE_CONTACT_EMAIL_INPUT, (element) => {
            element.value = 'francis.drake@police.com';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        await clickSelector(page, CONTINUE_BUTTON);
    }

    it('upload 1 document', async() => {
        try {
            await verifyUser();
            await completeFormUptoX();
            await completeFormFromXtoY();
        } catch (err) {
            throw new Error(err);
        }
    });
});
