'use strict';
const BrowserHandler = require('./browser');
const getContainerIP = require('../user-pathways/util/get-container-ip');

/**
 * Get test environment options
 *
 * If the 'BROWSER_TYPE' is set to remote then set 'isLocalTest' and
 * 'isDemo' to false
 *
 * If the 'BROWSER_DEMO' is set then set 'isDemo' to true unless the
 * 'BROWSER_TYPE' is set to remote
 *
 * @returns {object} - object containing the test environment options
 */
const getTestEnvironmentOptions = () => {
  const { BROWSER_TYPE, BROWSER_DEMO } = process.env;

  let isLocalTest = true;
  let isDemo = BROWSER_DEMO ? true : false;

  if (BROWSER_TYPE && BROWSER_TYPE === 'remote') {
    isLocalTest = false;
    isDemo = false;

    return { isLocalTest, isDemo };
  }

  return { isLocalTest, isDemo };
};

/**
 * Initialise browser either locally or within a docker container
 *
 * If the local machine browser is not being used then we will attempt to obtain
 * the IP address
 * @see getContainerIP
 *
 * @return {Object} - with the browser object, page object and localhost IP
 *
 */
const buildBrowser = async () => {
  const { isLocalTest, isDemo } = getTestEnvironmentOptions();

  const browser = await BrowserHandler.getBrowser(isLocalTest, isDemo);
  const page = await BrowserHandler.getBrowserPage(browser);
  let hostIP = 'localhost';

  if (!isLocalTest) {
    hostIP = await getContainerIP('modern-slavery-main');
  }

  return { browser, page, hostIP };
};

module.exports = {
  buildBrowser,
  getTestEnvironmentOptions
};
