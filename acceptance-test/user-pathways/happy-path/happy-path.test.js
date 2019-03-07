'use strict';
const bootstrap = require('../../bootstrap/bootstrap');
const selectors = require('../util/selectors');
const pageActions = require('../util/page-actions');
const { clickSelector, navigateTo } = pageActions;

const {
    CONTINUE_BUTTON,
    EMAIL_INPUT,
    ORGANISATION_INPUT,
    WHAT_HAPPENED_INPUT,
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
    FR_ALTERNATE_CONTACT_EMAIL_INPUT,
    PV_UNDER_AGE_YES_OPTION,
    LOCAL_AUTHORITY_NAME,
    LOCAL_AUTHORITY_PHONE,
    LOCAL_AUTHORITY_EMAIL,
    REFER_CASE_TO_NRM_NO_OPTION,
    REFUSE_NRM_POLICE_CONTACT_YES_OPTION,
    REFUSE_NRM_PV_NAME_FIRST_NAME,
    REFUSE_NRM_PV_NAME_LAST_NAME,
    REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_OPTION,
    REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_INPUT,
    REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION,
} = selectors;

const APP_CONTAINER_PORT = process.env.PORT || 8081;
let APP_CONTAINER_HOST;

let browser;
let page;

describe.only('User path(s)', () => {
    beforeEach(async() => {
        let { browser: testBrowser, page: initialPage, hostIP } = await bootstrap.buildBrowser();

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
        await clickSelector(page, CONTINUE_BUTTON);
        // who-do-you-work-for
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
     * page.$eval(param1, param2) has a limitation such that we cannot pass a
     * variable to param2 (function in the second parameter). This is because
     * the function is excuted within the browser and cannot recognise any
     * variables passed to it execept those that exist within the browser.
     *
     * @param {string} typeOfPV - type of Potential Victim 'child' or 'adult'
     * @param {bool} caseReferred - does the Potential Victim was their case
     * referred?
     *
     * @returns {Promise}
     */
    async function completeNrmFormPart1(typeOfPV, caseReferred) {
        // nrm start
        await clickSelector(page, CONTINUE_BUTTON);
        // fr-location
        await clickSelector(page, LOCATION_ENGLAND_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);

        if (typeOfPV === 'adult') {
            // pv-under-age
            await clickSelector(page, PV_UNDER_AGE_NO_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // pv-under-age-at-time-of-exploitation
            await clickSelector(page, PV_UNDER_AGE_AT_TIME_OF_EXPLOITATION_NO_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
        } else {
            // pv-under-age
            await clickSelector(page, PV_UNDER_AGE_YES_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // local-authority-contacted-about-child
            await page.waitForSelector(LOCAL_AUTHORITY_NAME);
            await page.$eval(LOCAL_AUTHORITY_NAME, (element) => {
                element.value = 'Local Authority A';
            });
            await page.$eval(LOCAL_AUTHORITY_PHONE, (element) => {
                element.value = '020878546453';
            });
            await page.$eval(LOCAL_AUTHORITY_EMAIL, (element) => {
                element.value = 'test@authority.org';
            });
            await clickSelector(page, CONTINUE_BUTTON);
        }

        // what-happened
        await page.waitForSelector(WHAT_HAPPENED_INPUT);
        await page.$eval(WHAT_HAPPENED_INPUT, (element) => {
            element.value = 'Test input regarding details of exploitation';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // where-exploitation-happened
        await clickSelector(page, EXPLOITED_IN_UK_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // current-pv-location
        await page.$eval(CURRENT_PV_LOCATION_UK_REGION, (element) => {
            element.value = 'Rutland';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // who-exploited-pv
        await page.$eval(WHO_EXPLOITED_PV, (element) => {
            element.value = 'Test details about exploiter(s)';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // types-of-exploitation
        await clickSelector(page, CONTINUE_BUTTON);
        // any-other-pvs
        await clickSelector(page, ANY_OTHER_PVS_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // reported-to-police
        await clickSelector(page, PV_HAS_CRIME_REFERENCE_NUMBER_YES_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);

        if (caseReferred && typeOfPV === 'adult') {
            // pv-want-to-submit-nrm
            await clickSelector(page, REFER_CASE_TO_NRM_YES_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // does-pv-need-support
            await clickSelector(page, DOES_PV_NEED_SUPPORT_NO_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
        } else if (!caseReferred && typeOfPV === 'adult') {
            // pv-want-to-submit-nrm
            await clickSelector(page, REFER_CASE_TO_NRM_NO_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // refuse-nrm
            await clickSelector(page, CONTINUE_BUTTON);
            // refuse-nrm-co-operate-with-police
            await clickSelector(page, REFUSE_NRM_POLICE_CONTACT_YES_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // refuse-nrm-pv-name
            await page.waitForSelector(REFUSE_NRM_PV_NAME_FIRST_NAME);
            await page.$eval(REFUSE_NRM_PV_NAME_FIRST_NAME, (element) => {
                element.value = 'Robert';
            });
            await page.$eval(REFUSE_NRM_PV_NAME_LAST_NAME, (element) => {
                element.value = 'Maxwell';
            });
            await clickSelector(page, CONTINUE_BUTTON);
            // refuse-nrm-pv-contact-details
            await clickSelector(page, REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_OPTION);
            await page.waitForSelector(REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_INPUT);
            await page.$eval(REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_INPUT, (element) => {
                element.value = 'robert.maxwell@pvrefuse.com';
            });
            await clickSelector(page, REFUSE_NRM_PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // summary page
            await clickSelector(page, CONTINUE_BUTTON);
        }
    }

    /**
     * Run a sequence of actions to simulate the completion of the second half
     * of the NRM form
     *
     * page.$eval(param1, param2) has a limitation such that we cannot pass a
     * variable to param2 (function in the second parameter). This is because
     * the function is excuted within the browser and cannot recognise any
     * variables passed to it execept those that exist within the browser.
     *
     *  @param {string} typeOfPV - type of Potential Victim 'child' or 'adult'
     *
     * @returns {Promise}
     */
    async function completeNrmFormPart2(typeOfPV) {
        // pv-name-that-requires-support
        await page.waitForSelector(PV_NAME_REQUIRING_SUPPORT_FIRST_NAME);
        await page.$eval(PV_NAME_REQUIRING_SUPPORT_FIRST_NAME, (element) => {
            element.value = 'Paul';
        });
        await page.$eval(PV_NAME_REQUIRING_SUPPORT_LAST_NAME, (element) => {
            element.value = 'Shortlands';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-dob
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-gender
        await clickSelector(page, PV_GENDER_MALE_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // does-pv-have-children
        await clickSelector(page, DOES_PV_HAVE_CHILDREN_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-nationality
        await page.waitForSelector(PV_NATIONALITY);
        await page.$eval(PV_NATIONALITY, (element) => {
            element.value = 'United Kingdom';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-interpreter-requirements
        await clickSelector(page, INTERPRETER_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-other-help-with-communication
        await clickSelector(page, COMMUNICATION_AID_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);
        // pv-ho-reference
        await clickSelector(page, HO_REFERENCE_NO_OPTION);
        await clickSelector(page, CONTINUE_BUTTON);

        if (typeOfPV === 'adult') {
            // pv-contact-details
            await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_OPTION);
            await page.waitForSelector(PV_CONTACT_DETAILS_EMAIL_INPUT);
            await page.$eval(PV_CONTACT_DETAILS_EMAIL_INPUT, (element) => {
                element.value = 'paul.shortlands@pv.com';
            });
            await clickSelector(page, PV_CONTACT_DETAILS_EMAIL_SAFE_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // pv-phone-number
            await clickSelector(page, PV_PHONE_NUMBER_NO_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
            // co-operate-with-police
            await clickSelector(page, POLICE_CONTACT_YES_OPTION);
            await clickSelector(page, CONTINUE_BUTTON);
        }

        // fr-details
        await page.waitForSelector(FR_DETAILS_NAME_INPUT);
        await page.$eval(FR_DETAILS_NAME_INPUT, (element) => {
            element.value = 'Jack Smith';
        });
        await page.$eval(FR_DETAILS_ROLE_INPUT, (element) => {
            element.value = 'Police Officer';
        });
        await page.$eval(FR_DETAILS_PHONE_INPUT, (element) => {
            element.value = '02086757436';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // fr-alternative-contact
        await page.waitForSelector(FR_ALTERNATE_CONTACT_EMAIL_INPUT);
        await page.$eval(FR_ALTERNATE_CONTACT_EMAIL_INPUT, (element) => {
            element.value = 'jack.smith@police.com';
        });
        await clickSelector(page, CONTINUE_BUTTON);
        // summary page
        await clickSelector(page, CONTINUE_BUTTON);
    }

    it('Happy path - Adult', async() => {
        try {
            await verifyUser();
            await completeNrmFormPart1('adult', true);
            await completeNrmFormPart2('adult');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('User path - Child', async() => {
        try {
            await verifyUser();
            await completeNrmFormPart1('child', true);
            await completeNrmFormPart2('child');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('User path - Duty to Notify (Adult)', async() => {
        try {
            await verifyUser();
            await completeNrmFormPart1('adult', false);
        } catch (err) {
            throw new Error(err);
        }
    });
});
