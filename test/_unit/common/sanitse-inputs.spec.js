'use strict';

const reqres = require('reqres');
const sanitiseInputs = require('../../../apps/common/behaviours/sanitise-inputs');

// Base middleware class for extending, which contains the sanitiseInputs configurations
class Base {
  constructor() {
    this.options = {};
  }
}

describe('sanitise inputs middleware', () => {
  let req;
  let res;
  let next;
  let SanitisingMiddleware;
  let instance;

  beforeEach( () => {
    req = reqres.req(); // Initialize req object
    res = reqres.res(); // Initialize res object
    next = sinon.stub(); // Create a stub for the next function
    SanitisingMiddleware = sanitiseInputs(Base); // Create the class with sanitiseInputs
    instance = new SanitisingMiddleware({});
  });

  describe('configure()', () => {
    it('default sanitisationInputs set to true', () => {
      instance.configure(req, res, next);
      expect(instance.options.sanitiseInputs).to.be.true; // Verify that sanitiseInputs has been set to true
      expect(next).to.have.been.called; // Ensure that next() was called
    });
  });
});
