'use strict';
const bootstrap = require('../../bootstrap/bootstrap');
const selectors = require('../util/selectors');

const {
    VIEWPORT,
    CONTINUE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_2_YES_OPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION,
    UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON,
    UPLOAD_DOCUMENT_PAGE_4_NO_OPTION,
    EMAIL_INPUT,
    TEST_FILE_PATH,
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
} = selectors;

const APP_CONTAINER_PORT = process.env.PORT || 8081;
let APP_CONTAINER_HOST;

let browser;
let page;
let url;

/**
 * Click on a page element
 *
 * @param {string} selector - selector for element on the page
 *
 * @returns {Promise}
 */
async function clickElement(selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

/**
 * Navigate to a page
 *
 * @param {string} urlString - the page url
 *
 * @returns {Promise}
 */
async function navigateTo(urlString) {
    url = urlString;
    await page.goto(url);
    await page.setViewport(VIEWPORT);
}

/**
 * Upload File on a page
 *
 * @param {string} selector - selector for element on the page
 * @param {string} filePath - The location of the file
 *
 * @returns {void}
 */
async function uploadFile(selector, filePath) {
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.uploadFile(filePath);
}

describe('Upload File(s)', () => {
    beforeEach(async() => {
        let { browser: testBrowser, page: initialPage, hostIP } = await bootstrap.buildBrowser();

        browser = testBrowser;
        page = initialPage;

        APP_CONTAINER_HOST = hostIP;

        url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}`;

        await page.goto(url);
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
     * @returns {Promise}
     */
    async function verifyUser() {
        // start
        await clickElement(CONTINUE_BUTTON);
        // who-do-you-work-for
        await page.$eval(ORGANISATION_INPUT, (element) => {
            element.value = 'Barnardos';
        });
        await page.$eval(EMAIL_INPUT, (element) => {
            element.value = 'test.user@homeoffice.gov.uk';
        });
        await clickElement(CONTINUE_BUTTON);
        // Bypass user clicking email link - Notify Key will not be set during test runs
        await navigateTo(`http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`);
    }

    /**
     * Run a sequence of actions to simulate the completion of the first half
     * of the NRM form
     *
     * @returns {Promise}
     */
    async function completeNrmFormPart1() {
        // nrm start
        await clickElement(CONTINUE_BUTTON);
        // fr-location
        await clickElement(LOCATION_ENGLAND_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // pv-under-age
        await clickElement(PV_UNDER_AGE_NO_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // pv-under-age-at-time-of-exploitation
        await clickElement(PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // what-happened
        await page.$eval(WHAT_HAPPENED_INPUT, (element) => {
            element.value = 'Test input regarding details of exploitation';
        });
        await clickElement(CONTINUE_BUTTON);
        // where-exploitation-happened
        await clickElement(EXPLOITED_IN_UK_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // current-pv-location
        await page.$eval(CURRENT_PV_LOCATION_UK_REGION, (element) => {
            element.value = 'Rutland';
        });
        await clickElement(CONTINUE_BUTTON);
        // who-exploited-pv
        await page.$eval(WHO_EXPLOITED_PV, (element) => {
            element.value = 'Test details about exploiter(s)';
        });
        await clickElement(CONTINUE_BUTTON);
        // types-of-exploitation
        await clickElement(CONTINUE_BUTTON);
        // any-other-pvs
        await clickElement(ANY_OTHER_PVS_NO_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // reported-to-police
        await clickElement(PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // pv-want-to-submit-nrm
        await clickElement(REFER_CASE_TO_NRM_YES_OPTION);
        await clickElement(CONTINUE_BUTTON);
    }

    /**
     * Run a sequence of actions to simulate the completion of the second half
     * of the NRM form
     */
    async function completeNrmFormPart2() {
        // Run through the skeleton until we reach the upload page
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        // supporting-documents-add
        await clickElement(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // supporting-documents
        await uploadFile(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT, TEST_FILE_PATH());
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION, (element) => {
            element.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);
        // supporting-documents-add-another
        await clickElement(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await clickElement(CONTINUE_BUTTON);
        // Run through the skeleton until we reach the end
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
        await clickElement(CONTINUE_BUTTON);
    }

    it('upload 1 document', async() => {
        try {
            await verifyUser();
            await completeNrmFormPart1();
            await completeNrmFormPart2();
        } catch (err) {
            throw new Error(err);
        }
    });
});
