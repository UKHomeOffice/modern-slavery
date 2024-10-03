'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    this.options.sanitiseInputs = true;
    next();
  }
};
