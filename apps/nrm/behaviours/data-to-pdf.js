'use strict';
const util = require('../util/transform-data');

// This is only for development purposes to show the pdf in
// the template
// The actual data in the pdf is in util/transform-data
module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const values = req.sessionModel.options.session['hof-wizard-nrm'];
    const data = util.transformData(values);
    const locals = Object.assign({}, superlocals, data);
    return locals;
  }
};
