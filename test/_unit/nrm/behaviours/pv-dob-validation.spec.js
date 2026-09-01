'use strict';

const Behaviour = require('../../../../apps/nrm/behaviours/pv-dob-validation');

describe('/apps/nrm/behaviours/pv-dob-validation', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    validate() { }
  }

  let req;
  let res;
  let instance;
  let next;
  let PvDobValidation;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.stub();
    PvDobValidation = Behaviour(Base);
    instance = new PvDobValidation();
    instance.ValidationError = class MockValidationError {
      constructor(key, options) {
        this.key = key;
        this.type = options.type;
      }
    };
    sinon.stub(Base.prototype, 'validate');
  });

  afterEach(() => {
    Base.prototype.validate.restore();
  });

  it('returns required error when neither dob nor unknown checkbox is provided', () => {
    req.form = {
      values: {}
    };

    instance.validate(req, res, next);

    expect(next).to.have.been.calledOnce;
    const err = next.firstCall.args[0];
    expect(err['pv-dob']).to.exist;
    expect(err['pv-dob'].type).to.equal('required');
    expect(Base.prototype.validate).to.not.have.been.called;
  });

  it('calls parent validate when dob is provided', () => {
    req.form = {
      values: {
        'pv-dob': '2001-03-31'
      }
    };

    instance.validate(req, res, next);

    expect(Base.prototype.validate).to.have.been.calledOnce;
  });

  it('calls parent validate when unknown checkbox is checked', () => {
    req.form = {
      values: {
        'pv-dob-not-known': 'true'
      }
    };

    instance.validate(req, res, next);

    expect(Base.prototype.validate).to.have.been.calledOnce;
  });
});