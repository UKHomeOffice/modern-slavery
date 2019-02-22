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
 * Select the continue button a number of times specified within the
 * supplied parameters
 *
 * @param {number} loopCount - the number of time the loop should run
 *
 * @returns {void}
 */
const clickContinueButton = async(loopCount) => {
    for (let i = 0; i < loopCount; i++) {
            await page.waitForSelector(CONTINUE_BUTTON);
            await page.click(CONTINUE_BUTTON);
    }
};

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
     * Navigate from Who do you work for? Page
     *
     * @returns {void}
     */
    async function whoDoYouWorkForPage() {
        await page.waitForSelector(ORGANISATION_INPUT);
        await page.$eval(ORGANISATION_INPUT, (element) => {
            element.value = 'Barnardos';
        });
        await page.$eval(EMAIL_INPUT, (element) => {
            element.value = 'test.user@homeoffice.gov.uk';
        });
        await clickContinueButton(1);
    }

    /**
     * Navigate from Where are you making this report? Page
     *
     * @returns {void}
     */
    async function whereAreYouMakingThisReportPage() {
        await page.waitForSelector(LOCATION_ENGLAND_OPTION);
        await page.click(LOCATION_ENGLAND_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Is the potential victim under 18? Page
     *
     * @returns {void}
     */
    async function isThePotentialVictimUnder18Page() {
        await page.waitForSelector(PV_UNDER_AGE_NO_OPTION);
        await page.click(PV_UNDER_AGE_NO_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Were they under 18 at any time during the exploitation?
     * Page
     *
     * @returns {void}
     */
    async function wereTheyUnder18AtAnyTimeDuringTheExploitationPage() {
        await page.waitForSelector(PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
        await page.click(PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from What did they say happened? Page
     *
     * @returns {void}
     */
    async function whatDidTheySayHappenedPage() {
        await page.waitForSelector(WHAT_HAPPENED_INPUT);
        await page.$eval(WHAT_HAPPENED_INPUT, (element) => {
            element.value = 'Test input regarding details of exploitation';
        });
        await clickContinueButton(1);
    }

    /**
     * Navigate from Where were they last exploited? Page
     *
     * @returns {void}
     */
    async function whereWereTheyLastExploitedPage() {
        await page.waitForSelector(EXPLOITED_IN_UK_OPTION);
        await page.click(EXPLOITED_IN_UK_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Where are they now? Page
     *
     * @returns {void}
     */
    async function whereAreTheyNowPage() {
        await page.waitForSelector(CURRENT_PV_LOCATION_UK_REGION);
        await page.$eval(CURRENT_PV_LOCATION_UK_REGION, (element) => {
            element.value = 'Rutland';
        });
        await clickContinueButton(1);
    }

    /**
     * Navigate from Who exploited them? Page
     *
     * @returns {void}
     */
    async function whoExploitedThemPage() {
        await page.waitForSelector(WHO_EXPLOITED_PV);
        await page.$eval(WHO_EXPLOITED_PV, (element) => {
            element.value = 'Test details about exploiter(s)';
        });
        await clickContinueButton(1);
    }

    /**
     * Navigate from How were they exploited? Page
     *
     * @returns {void}
     */
    async function howWereTheyExploitedPage() {
        await clickContinueButton(1);
    }

    /**
     * Navigate from Were there any other potential victims? Page
     *
     * @returns {void}
     */
    async function wereThereAnyOtherPotentialVictimsPage() {
        await page.waitForSelector(ANY_OTHER_PVS_NO_OPTION);
        await page.click(ANY_OTHER_PVS_NO_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Do they have a crime reference number? Page
     *
     * @returns {void}
     */
    async function doTheyHaveACrimeReferenceNumberPage() {
        await page.waitForSelector(PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION);
        await page.click(PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Do they want their case referred to the NRM? Page
     *
     * @returns {void}
     */
    async function doTheyWantTheirCaseReferredToTheNrmPage() {
        await page.waitForSelector(REFER_CASE_TO_NRM_YES_OPTION);
        await page.click(REFER_CASE_TO_NRM_YES_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Do you want to upload supporting documents? Page
     *
     * @returns {void}
     */
    async function doYouWantToUploadSupportingDocumentsPage() {
        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await clickContinueButton(1);
    }

    /**
     * Navigate from Upload supporting documents Page
     *
     * @returns {void}
     */
    async function uploadSupportingDocumentsPage() {
        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_INPUT);
        await input.uploadFile(TEST_FILE_PATH());

        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION, (element) => {
            element.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);
    }

    /**
     * Navigate from Do you want to upload any additional documents to support your application? Page
     *
     * @returns {void}
     */
    async function doYouWantToUploadAnyAdditionalDocumentsToSupportYourApplicationPage() {
        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await clickContinueButton(1);
    }

    it('upload 1 document', async() => {
        try {
            // start
            await clickContinueButton(1);

            // who-do-you-work-for
            await whoDoYouWorkForPage();

            // Bypass user clicking email link - Notify Key will not be set during test runs
            url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`;
            await page.goto(url);

            // Hit the url a second time since the first page resolves to an error
            await page.goto(url);
            await page.setViewport(VIEWPORT);

            // nrm start
            await clickContinueButton(1);

            // fr-location
            await whereAreYouMakingThisReportPage();

            // pv-under-age
            await isThePotentialVictimUnder18Page();

            // pv-under-age-at-time-of-exploitation
            await wereTheyUnder18AtAnyTimeDuringTheExploitationPage();

            // what-happened
            await whatDidTheySayHappenedPage();

            // where-exploitation-happened
            await whereWereTheyLastExploitedPage();

            // current-pv-location
            await whereAreTheyNowPage();

            // who-exploited-pv
            await whoExploitedThemPage();

            // types-of-exploitation
            await howWereTheyExploitedPage();

            // any-other-pvs
            await wereThereAnyOtherPotentialVictimsPage();

            // reported-to-police
            await doTheyHaveACrimeReferenceNumberPage();

            // pv-want-to-submit-nrm
            await doTheyWantTheirCaseReferredToTheNrmPage();

            // Run through the skeleton until we reach the upload page
            await clickContinueButton(12);

            // supporting-documents-add
            await doYouWantToUploadSupportingDocumentsPage();

            // supporting-documents
            await uploadSupportingDocumentsPage();

            // supporting-documents-add-another
            await doYouWantToUploadAnyAdditionalDocumentsToSupportYourApplicationPage();

            // Run through the skeleton until we reach the end
            await clickContinueButton(3);

        } catch (err) {
            throw new Error(err);
        }
    });
});
