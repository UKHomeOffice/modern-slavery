'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/check-email-token');
const checkToken = require('../../../../apps/nrm/models/check-token');

describe('apps/nrm/behaviours/email-lookup-sender', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  let req;
  let res;
  let sessionModel;
  let CheckEmailToken;
  let instance;

  class Base {
    getValues() {}
  }

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub()
    };
    res = reqres.res();
    req = reqres.req({sessionModel});
    CheckEmailToken = Behaviour(Base);
    instance = new CheckEmailToken();
  });

  describe('getValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues');
      // sinon.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');
      sinon.stub(checkToken, 'delete');
      sinon.stub(checkToken, 'read')
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
      checkToken.read.restore();
      checkToken.delete.restore();
    });

    it('calls the parent when we provide a skip token in the development environment', () => {
      process.env.NODE_ENV = 'development';
      req.query = {
        token: 'skip'
      };
      instance.getValues(req, res);

      Base.prototype.getValues.should.have.been.calledWith(req, res);
    });

    it('calls the parent when there is already a valid token', () => {
      req.sessionModel.get.withArgs('valid-token').returns(true);

      instance.getValues(req, res);

      Base.prototype.getValues.should.have.been.calledWith(req, res);
    });


    it('deletes the new token if we find it in our db', () => {
      req.query = {
        token: 'test'
      };
      checkToken.read.withArgs('test').resolves(true);

      instance.getValues(req, res);

      checkToken.deletes.should.eventually.have.been.called();
    });
    it('sets a valid-token to true when the new token is valid');
    it('calls the parent when the new token is valid');
    it('calls the parent when the new token is valid');
    it('goes to an error page if we can not match our new token in our db');


  });
});
