/* eslint-disable no-undef */
'use strict';
const puppeteer = require('puppeteer');
const path = require('path');

describe('Upload File', () => {
  let browser;
  let page;
  const VIEWPORT = { width: 1920, height: 1080 };
  const url = 'http://localhost:8081/nrm/start?token=skip';
  const START_PAGE_HEADING_SELECTOR = '#start';
  const START_PAGE_HEADING_TEXT = 'Start';
  const START_BUTTON_SELECTOR = '#content > div > form > input.button';
  const UPLOAD_DOCUMENT_PAGE_1_TITLE_TEXT = 'Do you want to upload supporting documents – GOV.UK';
  // const UPLOAD_DOCUMENT_PAGE_2_NO_OPTION = '#supporting-documents-add-no';
  const UPLOAD_DOCUMENT_PAGE_2_YES_OPTION = '#supporting-documents-add-yes';
  const UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON = '#content > div > form > input.button';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR = '#supporting-document-upload';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR = '#supporting-document-description';
  const UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON = '#content > div > form > p > input';
  const UPLOAD_DOCUMENT_PAGE_4_YES_OPTION = '#supporting-documents-add-another-yes';
  const UPLOAD_DOCUMENT_PAGE_4_NO_OPTION = '#supporting-documents-add-another-no';
  const UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON = '#content > div > form > input.button';
  const UPLOAD_DOCUMENT_PAGE_4_DELETE_BUTTON = (childNumber) => {
      return `#supporting-documents-list > table > tbody > tr > td:nth-child(${childNumber + 1}) > a`;
  };
  const TEST_FILE_PATH = path.resolve(__dirname, '../../public/images/test.png');
  const CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON = '#content > div > form > input.button';

  beforeEach(async () => {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 150,
        args: ['--ash-host-window-bounds=1920x1080', '--window-size=1920,1048', '--window-position=0,0'],
      });
      page = await browser.newPage();
      await page.setViewport(VIEWPORT);
  });

  afterEach(() => {
      browser.close();
  });

  it.skip('Redirects to Start Page', async () => {
      await page.goto(url);
      await page.goto(url);
      await page.waitForSelector(START_PAGE_HEADING_SELECTOR);

      const heading = await page.evaluate((START_PAGE_HEADING_SELECTOR_REPLICA) => {
        return document.querySelector(START_PAGE_HEADING_SELECTOR_REPLICA).textContent;
      }, START_PAGE_HEADING_SELECTOR);

      expect(heading).to.equal(START_PAGE_HEADING_TEXT);
  });

  it.skip('navigate to upload document page 1', async () => {
    await page.goto(url);
    await page.goto(url);
    await page.waitForSelector(START_BUTTON_SELECTOR);
    await page.click(START_BUTTON_SELECTOR);
    const pageTitle = await page.title();
    expect(pageTitle).to.equal(UPLOAD_DOCUMENT_PAGE_1_TITLE_TEXT);
});

    it.skip('navigate to upload document page 2', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);

        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);
    });

    it.skip('navigate to upload document page 3', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (el) => {
            el.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);


    });

    it.skip('navigate to upload document page 4', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
            element.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);

    });

    it('upload 1 document', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
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


    it('upload 1 document then remove it and then add it back again', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
            element.value = 'NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_DELETE_BUTTON(1));
        await page.click(UPLOAD_DOCUMENT_PAGE_4_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const newInput = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await newInput.uploadFile(TEST_FILE_PATH);
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


    it('trigger no file selected validatiion then upload 1 document', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
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

    it('upload 2 documents', async () => {
        await page.goto(url);
        await page.goto(url);
        await page.waitForSelector(START_BUTTON_SELECTOR);
        await page.click(START_BUTTON_SELECTOR);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_2_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const input = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await input.uploadFile(TEST_FILE_PATH);
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
            element.value = 'NRM Test File example 1';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_YES_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        const newInput = await page.$(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_SELECTOR);
        await newInput.uploadFile(TEST_FILE_PATH);
        await page.$eval(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_DESCRIPTION_SELECTOR, (element) => {
            element.value = 'Another NRM Test File example';
        });
        await page.click(UPLOAD_DOCUMENT_PAGE_3_UPLOAD_FILE_BUTTON);

        await page.waitForSelector(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_NO_OPTION);
        await page.click(UPLOAD_DOCUMENT_PAGE_4_CONTINUE_BUTTON);

        await page.waitForSelector(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);
        await page.click(CONFIRM_SUBMISSION_PAGE_CONFIRM_BUTTON);
    });

});
