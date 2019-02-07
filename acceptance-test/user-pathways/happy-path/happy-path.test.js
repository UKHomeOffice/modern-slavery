'use strict';
const bootstrap = require('../../bootstrap/bootstrap');
const selectors = require('../util/selectors');

const {
    VIEWPORT,
    PAGE_TRANSITION_BUTTON_SELECTOR,
    UPLOAD_DOCUMENT_PAGE_2_NO_OPTION,
    USER_EMAIL_EMAIL_INPUT,
} = selectors;

const APP_CONTAINER_PORT = process.env.PORT || 8081;
let APP_CONTAINER_HOST;

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
const clickTransitionButton = async(loopCount) => {
    for (let i = 0; i < loopCount; i++) {
            await page.waitForSelector(PAGE_TRANSITION_BUTTON_SELECTOR);
            await page.click(PAGE_TRANSITION_BUTTON_SELECTOR);
    }
};

describe('Critical user path(s)', () => {
    beforeEach(async() => {
        let { page: initialPage, hostIP } = await bootstrap.buildBrowser();

        page = initialPage;
        APP_CONTAINER_HOST = hostIP;

        url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}`;

        await page.goto(url);
    });

    it('Happy path - Adult', async() => {
        try {
            await clickTransitionButton(1);
            await page.$eval(USER_EMAIL_EMAIL_INPUT, (element) => {
                element.value = 'test.user@homeoffice.gov.uk';
            });
            await clickTransitionButton(1);

            // Bypass user clicking email link - Notify Key will not be set during test runs
            url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`;
            await page.goto(url);

            // Hit the url a second time since the first page resolves to an error
            await page.goto(url);
            await page.setViewport(VIEWPORT);

            // Run through the skeleton until we reach the upload page
            await clickTransitionButton(24);

            await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_NO_OPTION);
            await page.click(UPLOAD_DOCUMENT_PAGE_2_NO_OPTION);

            // Run through the skeleton until we reach the end
            await clickTransitionButton(4);

        } catch (err) {
            throw new Error(err);
        }
    });
});
