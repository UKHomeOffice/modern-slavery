/* eslint-disable no-undef */
'use strict';
const puppeteer = require('puppeteer');
const path = require('path');
// eslint-disable-next-line implicit-dependencies/no-implicit
const request = require('request-promise-native');
const getContainerIP = require('../util/get-container-ip');

describe('Upload File(s) using headless chrome browser within Docker container', () => {
  const VIEWPORT = { width: 1920, height: 1080 };
  const START_BUTTON_SELECTOR = '#content > div > form > input.button';
  const UPLOAD_DOCUMENT_PAGE_2_YES_OPTION = '#supporting-documents-add-yes';
  const UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON = '#content > div > form > input.button';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR = '#supporting-document-upload';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR = '#supporting-document-description';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON = '#content > div > form > p > input';
  // const UPLOAD_DOCUMENT_PAGE_4_YES_OPTION = '#supporting-documents-add-another-yes';
  const UPLOAD_DOCUMENT_PAGE_4_NO_OPTION = '#supporting-documents-add-another-no';
  const UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON = '#content > div > form > input.button';
  /* const UPLOAD_DOCUMENT_PAGE_4_DELETE_BUTTON = (childNumber) => {
      return `#supporting-documents-list > table > tbody > tr > td:nth-child(${childNumber + 1}) > a`;
  }; */
  const TEST_FILE_PATH = path.resolve('/app/public/images/test.png');
  const CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON = '#content > div > form > input.button';

    it('upload 1 document', async () => {
            // Workaround for https://github.com/GoogleChrome/puppeteer/issues/2242
            const chrome = await getContainerIP('chrome-browser');
            const appIP = await getContainerIP('app');

            const APP_CONTAINER_HOST = appIP;
            const APP_CONTAINER_PORT = 8081;

            const CHROME_BROWSER_CONTAINER_HOST = chrome;
            const CHROME_BROWSER_CONTAINER_PORT = 9222;

            const url = `http://${APP_CONTAINER_HOST}:${APP_CONTAINER_PORT}/nrm/start?token=skip`;

            const options = {
            uri: `http://${CHROME_BROWSER_CONTAINER_HOST}:${CHROME_BROWSER_CONTAINER_PORT}/json/version`,
            json: true,
            resolveWithFullResponse: true,
            };

            const response = await request(options);

            const runBrowser = (res) => {
                    let webSocket = res.body.webSocketDebuggerUrl;

                    return async () => {
                            const browser = await puppeteer.connect({
                            browserWSEndpoint: webSocket,
                            ignoreHTTPSErrors: true,
                            slowMo: 200,
                            });
                            const page = await browser.newPage();

                            await page.goto(url);
                            await page.goto(url);
                            await page.setViewport(VIEWPORT);
                            await page.waitForSelector(START_BUTTON_SELECTOR);
                            await page.click(START_BUTTON_SELECTOR);

                            await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
                            await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
                            await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

                            await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
                            const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
                            await input.uploadFile(TEST_FILE_PATH);
                            // eslint-disable-next-line max-nested-callbacks
                            await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
                                element.value = 'NRM Test File example';
                            });
                            await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

                            await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
                            await page.click(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
                            await page.click(UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON);

                            await page.waitForSelector(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);
                            await page.click(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);

                            browser.close();
                    };
            };

            await runBrowser(response)();
      });
});
