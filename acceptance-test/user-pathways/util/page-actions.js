'use strict';

const VIEWPORT = { width: 1920, height: 1080 };

/**
 * Click on a page element via selector
 *
 * @param {Promise<Page>} page - page instance
 * @param {string} selector - selector for element on the page
 *
 * @returns {Promise}
 */
async function clickSelector(page, selector) {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.click(selector);
}

async function focusThenType(page, selector, text) {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.type(text);
}

/**
 * Navigate to a page
 *
 * @param {Promise<Page>} page - page instance
 * @param {string} urlString - the page url
 *
 * @returns {Promise}
 */
async function navigateTo(page, urlString) {
  await page.goto(urlString);
  await page.setViewport(VIEWPORT);
}

/**
 * Upload File on a page
 *
 * @param {Promise<Page>} page - page instance
 * @param {string} selector - selector for element on the page
 * @param {string} filePath - The location of the file
 *
 * @returns {void}
 */
async function uploadFile(page, selector, filePath) {
  await page.waitForSelector(selector);
  const input = await page.$(selector);
  await input.uploadFile(filePath);
}

module.exports = {
  clickSelector,
  focusThenType,
  navigateTo,
  uploadFile
};
