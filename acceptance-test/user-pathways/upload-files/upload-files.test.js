/* eslint-disable no-undef */
'use strict';
const bootstrap = require('../../bootstrap/bootstrap');
const selectors = require('../selectors');

const {
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
} = selectors;

describe('Upload File(s) using headless chrome browser within Docker container', () => {

    it('upload 1 document', async () => {
        const { page, hostIP: APP_CONTAINER_HOST } = await bootstrap.buildBrowser();

        const { env: { PORT } } = process;
        const APP_CONTAINER_PORT = PORT || 8081;

        const url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`;

        await page.goto(url);
        // Hit the url a second time since the first page resolves to an error
        await page.goto(url);
        await page.setViewport(VIEWPORT);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH());

        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
            element.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON);

        await page.waitForSelector(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);
        await page.click(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);
      });
});
