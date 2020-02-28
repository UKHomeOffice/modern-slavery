'use strict';
const cookie = require('../models/cookie');
const generatecookie = async() => {
  // requires getting an email from the magiclink
  return await cookie.writeCookie({'user-email': 'bat@mail.com'});
};
let newCookie;

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    // pending magiclink functionality
    // get cookies and send it with user email, compare both
    const cookies = req.cookies;
    const nrmCookie = cookie.getNrmCookie(cookies);
    if (nrmCookie) {
      try {
        const validCookie = await cookie.readUuid(nrmCookie);
        if (validCookie) {
          // pending magiclink functionality
          // compare the email from the cookie with the magiclink one
          // eslint-disable-next-line no-console
          console.log('>>>>>>>valid cookie', validCookie);
        } else {
          // generate the cookie & add it to the db
          newCookie = await generatecookie();
          if (newCookie) {
            res.cookie('nrm', newCookie);
            // requires a redirect error page
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Unable to read cookie ${error}`);
        // redirect server page
      }
    } else {
      newCookie = await generatecookie();
      if (newCookie) {
        res.cookie('nrm', newCookie);
        // requires a redirect error page
      }
      // eslint-disable-next-line no-console
      console.log('O no cookie trouble');
      // server error page
    }

    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
