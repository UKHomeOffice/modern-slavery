'use strict';
const hostUrl = require('../../../config').hostUrl;

module.exports = superclass => class extends superclass {
  // pass in the hostUrl to locals so it can be used in the template
  locals(req, res) {
    const locals = super.locals(req, res);
    locals.hostUrl = hostUrl;
    return locals;
  }
};
