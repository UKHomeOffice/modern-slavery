'use strict';
const puppeteer = require('puppeteer');

/* Constants */
const DEMO_BROWSER_RUN_SPEED = 550;
const HEADLESS_BROWSER_RUN_SPEED = 100;
const VIEWPORT = { width: 1920, height: 1080 };

/**
 * Get the speed at which the browser will be slowed down by when it's running
 *
 * @param {bool} [isDemo=false] - When the browser is running is it for
 * demonstration purposes?
 *
 * @returns {number} - the number in which the browser will be slowed down by
 * when running
 */
const getBrowserRunSpeed = (isDemo) => {
    const browserRunSpeed = isDemo ?
        DEMO_BROWSER_RUN_SPEED : HEADLESS_BROWSER_RUN_SPEED;

    return browserRunSpeed;
};

/**
 * Get the browser options to be set before the browser is initialised
 *
 * @param {bool} isLocalBrowser - is the target browser on the local machine
 * @param {*} isDemo - When the browser is running is it for demonstration
 * purposes?
 *
 * @returns {Object} - browser options
 */
const getBrowserOptions = async(isLocalBrowser, isDemo) => {
    let browserOptions = {
        headless: !isDemo,
        slowMo: getBrowserRunSpeed(isDemo),
        args: ['--ash-host-window-bounds=1920x1080', '--window-size=1920,1048', '--window-position=0,0'],
    };

    return browserOptions;
};

/**
 * Get the browser that will be setup by puppeteer
 *
 * @param {*} localBrowser - is the target browser on the local machine
 * @param {*} demoMode - When the browser is running is it for demonstration
 * purposes?
 *
 * @returns {Promise<Browser>} browser instance
 */
const getBrowser = async(localBrowser, demoMode) => {
    let browser = null;

    const options = await getBrowserOptions(localBrowser, demoMode);

    browser = await puppeteer.launch(
        options,
    );

    return browser;
};

/**
 * Open a new page using the provided browser object
 *
 * The viewport of the page window is set so we take screenshot of the entire
 * screen if required
 *
 * @param {Promise<Browser>} browser - browser instance
 *
 * @returns {Promise<Page>} page instance
 */
const getBrowserPage = async(browser) => {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    return page;
};

module.exports = {
    getBrowser,
    getBrowserPage,
};
