/* eslint-disable no-console */
'use strict';

const puppeteer = require('puppeteer');
const axios = require('axios');
const getContainerIP = require('../user-pathways/util/get-container-ip');

/* Constants */
const DEMO_BROWSER_RUN_SPEED = 100;
const HEADLESS_BROWSER_RUN_SPEED = 100;
const VIEWPORT = { width: 1920, height: 1080 };

/**
 * Get the browser container response
 *
 * This is needed so we can extract the browser websocket endpoint from the body
 * of the request
 *
 * @const chrome - This is a workaround for the Error: `Host header is specified
 * and is not an IP address or localhost.` We wait for the script to determine
 * the host URL by looking up the DNS address for the container in which the
 * browser exists in order to formulate a URL that Puppeteer can use to create
 * a connection to the related browser.
 * See https://github.com/GoogleChrome/puppeteer/issues/2242 for more info
 *
 * @see getBrowserWebSocketEndpoint
 *
 * @returns {Object} - the response from the browser container
 */
const getBrowserContainerResponse = async () => {
  const chrome = await getContainerIP('chrome-browser');
  const chromeBrowserPort = 9222;

  const CHROME_BROWSER_CONTAINER_HOST = chrome;
  const CHROME_BROWSER_CONTAINER_PORT = chromeBrowserPort;

  const url = `http://${CHROME_BROWSER_CONTAINER_HOST}:${CHROME_BROWSER_CONTAINER_PORT}/json/version`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(`Error fetching browser container response: ${error.message}`);
  }
};

const getBrowserWebSocketEndpoint = response => {
  if (response && response.data) {
    const { webSocketDebuggerUrl } = response.data;
    return webSocketDebuggerUrl;
  }
  return null;
};

// Function to get the browser run speed
const getBrowserRunSpeed = isDemo => {
  const browserRunSpeed = isDemo ?
    DEMO_BROWSER_RUN_SPEED : HEADLESS_BROWSER_RUN_SPEED;

  return browserRunSpeed;
};

// Function to get browser options
const getBrowserOptions = async (isLocalBrowser, isDemo) => {
  let browserOptions = {
    headless: !isDemo,
    slowMo: getBrowserRunSpeed(isDemo),
    args: ['--ash-host-window-bounds=1920x1080', '--window-size=1920,1048', '--window-position=0,0']
  };

  if (!isLocalBrowser) {
    try {
      const response = await getBrowserContainerResponse();
      const socket = getBrowserWebSocketEndpoint(response);

      browserOptions = {
        browserWSEndpoint: socket,
        ignoreHTTPSErrors: true,
        slowMo: getBrowserRunSpeed(isDemo)
      };
    } catch (error) {
      // Handle or log the error appropriately
      console.error(`Error getting browser options: ${error.message}`);
    }

    return browserOptions;
  }

  return browserOptions;
};

/**
 * Get the browser that will be setup by puppeteer
 *
 * Puppeteer uses two different functions to setup the browser; launch()
 * for a local browser instance and connect() for a remote browser instance
 *
 * @param {*} localBrowser - is the target browser on the local machine or
 * a external (docker) container?
 * @param {*} demoMode - When the browser is running is it for demonstration
 * purposes?
 *
 * @returns {Promise<Browser>} browser instance
 */
const getBrowser = async (localBrowser, demoMode) => {
  let browser = null;

  const options = await getBrowserOptions(localBrowser, demoMode);

  if (localBrowser) {
    browser = await puppeteer.launch(
      options
    );
  } else {
    browser = await puppeteer.connect(
      options
    );
  }

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
const getBrowserPage = async browser => {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.setDefaultTimeout(5000);

  page.on('response', response => {
    const url = new URL(response.url());
    const fullUri = `${url.pathname}${url.search}`;
    const status = response.status();
    const ignoreBaseUris = [
      '/govuk-assets',
      '/public',
      '/assets'
    ];

    if (!ignoreBaseUris.some(v => fullUri.includes(v)) && status !== 302) {
      console.log('\x1b[36m%s\x1b[0m', `${status} ${fullUri}`);
    }
  });

  return page;
};

module.exports = {
  getBrowser,
  getBrowserPage
};
