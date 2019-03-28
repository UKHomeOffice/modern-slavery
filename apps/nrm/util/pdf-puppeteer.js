'use strict';
/* eslint-disable no-console */
const fs = require('fs');
const puppeteer = require('puppeteer');
const hogan = require('hogan.js');

module.exports = {
  generate: async(templateFile, destination, tempName, data) => {
    try {
      const file = `${destination}/${tempName}`;

      // reading the html template file and putting it into a variable
      const templateHtml = fs.readFileSync(templateFile, 'utf8');
      const template = hogan.compile(templateHtml);
      const html = template.render(data);

      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
      });
      const page = await browser.newPage();

      // pass in our template
      await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
      });

      await page.emulateMedia('screen');
      await page.pdf({
        path: file,
        format: 'A4',
        printBackground: true
      });

      console.log('>>>>>>>>>>> pdf generated');
      await browser.close();
      return file;
    } catch (e) {
      console.log('>>>>>>>>>our error', e);
    }
  }
};
