
'use strict';
const BrowserHandler = require('./browser');

/**
 * Get test environment options
 *
 * If the 'BROWSER_DEMO' is set then set 'isDemo' to true
 *
 * @returns {object} - object containing the test environment options
 */
const getTestEnvironmentOptions = () => {
    const { env: { BROWSER_DEMO } } = process;

    const isLocalTest = true;
    const isDemo = BROWSER_DEMO ? true : false;

    return { isLocalTest, isDemo };
};

/**
 * Initialise browser on local machine
 *
 * @return {Object} - with the browser object, page object and localhost IP
 *
 */
const buildBrowser = async () => {
    const { isLocalTest, isDemo } = getTestEnvironmentOptions();

    const browser = await BrowserHandler.getBrowser(isLocalTest, isDemo);
    const page = await BrowserHandler.getBrowserPage(browser);
    const hostIP = 'localhost';

    return { browser, page, hostIP };
};

module.exports = {
    buildBrowser,
    getTestEnvironmentOptions,
};
