'use strict';
/* eslint-disable no-console */

const puppeteer = require('puppeteer');

module.exports = {
  generate: async(url, destination, tempName) => {
    try {
      const file = `${destination}/${tempName}`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // let's try to pass in our template
      await page.goto(url);
      await page.emulateMedia('screen');
      await page.pdf({
        path: file,
        format: 'A4',
        printBackground: true
      });

      console.log('pdf generated');
      await browser.close();
      return file;
    } catch (e) {
      console.log('our error', e);
    }
  }
};
