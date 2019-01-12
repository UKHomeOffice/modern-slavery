'use strict';
const puppeteer = require('puppeteer');
// eslint-disable-next-line implicit-dependencies/no-implicit
const request = require('request-promise-native');
const getContainerIP = require('./util/get-container-ip');

(async () => {
  // Workaround for https://github.com/GoogleChrome/puppeteer/issues/2242
  const chrome = await getContainerIP('chrome');

  const options = {
    uri: `http://${chrome}:9222/json/version`,
    json: true,
    resolveWithFullResponse: true
  };

  request(options)
    .then((res) => {
      let webSocket = res.body.webSocketDebuggerUrl;
      // console.info(`WebsocketUrl: ${webSocket}`);

      (async () => {
        try {
          const browser = await puppeteer.connect({browserWSEndpoint: webSocket});
          const page = await browser.newPage();

          page.setJavaScriptEnabled(true);
          await page.goto('https://localhost:8081', { waitUntil: 'networkidle0' });
          await page.screenshot({path: 'test.png'});
        } catch (e) {
          // console.info(e);
        }
      })();
    })
    .catch((err) => {
      throw new Error(`Error :${err}`);
      // console.info(err.message);
    });
})();
