/* eslint-disable no-console */
'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const checkTokenStub = {
  read: sinon.stub(),
  delete: sinon.stub()
};
const configStub = {};

// we need to proxyquire checkToken model rather than requiring and then using sinon.
// As soon as you require the checkToken it tries to create a Redis connection. We do not
// want Redis as a dependency of our unit tests. Therefore stub it before it gets to that
const Behaviour = proxyquire('../../../../apps/nrm/behaviours/check-email-token', {
  '../models/check-token': checkTokenStub,
  '../../../config': configStub
});

describe('apps/nrm/behaviours/check-email-token', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  let req;
  let res;
  let sessionModel;
  let CheckEmailToken;
  let instance;

  class Base {
    saveValues() { }
  }

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub()
    };
    res = reqres.res();
    req = reqres.req({ sessionModel });
    CheckEmailToken = Behaviour(Base);
    instance = new CheckEmailToken();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    describe('does NOT bypass email authentication', () => {
      it('has NO allowSkip flag', () => {
        checkTokenStub.read.withArgs('skip').resolves({});
        req.query = {
          token: 'skip'
        };
        configStub.skipEmail = 'omar@gmail.com';
        configStub.allowSkip = false;
        instance.saveValues(req, res);
        Base.prototype.saveValues.should.not.have.been.calledWith(req, res);
      });

      it('has allowSkip flag set to TRUE but no email environment variable or email params', () => {
        checkTokenStub.read.withArgs('skip').resolves({});
        req.query = {
          token: 'skip'
        };
        configStub.allowSkip = true;
        configStub.skipEmail = '';
        instance.saveValues(req, res);
        Base.prototype.saveValues.should.not.have.been.calledWith(req, res);
      });
    });

    describe('bypasses email authentication', () => {
      it('when we provide a skip token, allowSkip, & skip email environment variable', () => {
        req.query = {
          token: 'skip'
        };
        configStub.allowSkip = true;
        configStub.skipEmail = 'mo@gmail.com';
        instance.saveValues(req, res);
        Base.prototype.saveValues.should.have.been.calledWith(req, res);
      });

      it('when we provide a skip token, allowSkip flag & skip email params', () => {
        req.query = {
          token: 'skip',
          email: 'ali@gmail.com'
        };
        configStub.allowSkip = true;
        instance.saveValues(req, res);

        Base.prototype.saveValues.should.have.been.calledWith(req, res);
      });

      it('bypasses email authentication when there is already a valid token', () => {
        req.query = {
          token: 'match',
          email: 'ronald@gmail.com'
        };
        req.sessionModel.get.withArgs('valid-token').returns(true);

        instance.saveValues(req, res);

        Base.prototype.saveValues.should.have.been.calledWith(req, res);
      });
    });

    describe('when it bypasses the email authentication', () => {
      it('sets the user email based on the email params if it bypasses the email authentication', () => {
        req.query = {
          token: 'skip',
          email: 'aisha@mail.com'
        };
        configStub.allowSkip = true;
        instance.saveValues(req, res);
        expect(sessionModel.set).to.have.been.calledWith('user-email', 'aisha@mail.com');
      });

      it('sets the user email based on the skipEmail environment variable if', () => {
        req.query = {
          token: 'skip'
        };
        configStub.allowSkip = true;
        configStub.skipEmail = 'ahmed@gmail.com';
        instance.saveValues(req, res);
        expect(sessionModel.set).to.have.been.calledWith('user-email', 'ahmed@gmail.com');
      });
    });

    describe('we get the token from the url & we look it up in our DB', () => {
      it('removes the ?hof-cookie-check query string from the token if it is there', async () => {
        const expected = {
          valid: 'match',
          email: 's@mail.com'
        };

        checkTokenStub.read.withArgs('match').resolves(expected);
        req.query = {
          token: 'match?hof-cookie-check'
        };

        instance.saveValues(req, res);
        await checkTokenStub.read.should.have.been.calledWith('match');
      });

      it('deletes the new token if we find it in our db', async () => {
        const expected = {
          valid: 'match',
          email: 's@mail.com'
        };

        checkTokenStub.read.withArgs('match').resolves(expected);
        req.query = {
          token: 'match'
        };

        instance.saveValues(req, res);
        await checkTokenStub.delete.should.have.been.calledWith('match');
      });
    });
  });
});
