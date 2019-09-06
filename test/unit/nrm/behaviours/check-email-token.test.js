'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const checkTokenStub = {
  read: sinon.stub(),
  delete: sinon.stub()
};

// we need to proxyquire checkToken model rather than requiring and then using sinon.
// As soon as you require the checkToken it tries to create a Redis connection. We do not
// want Redis as a dependency of our unit tests. Therefore stub it before it gets to that
const Behaviour = proxyquire('../../../../apps/nrm/behaviours/check-email-token',
  { '../models/check-token': checkTokenStub});

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
    saveValues() {}
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

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    it('calls the parent when we provide a skip token in the development environment', () => {
      process.env.NODE_ENV = 'development';
      req.query = {
        token: 'skip'
      };
      instance.saveValues(req, res);

      Base.prototype.saveValues.should.have.been.calledWith(req, res);
    });

    it('calls the parent when there is already a valid token', () => {
      req.sessionModel.get.withArgs('valid-token').returns(true);

      instance.saveValues(req, res);

      Base.prototype.saveValues.should.have.been.calledWith(req, res);
    });

    describe('we get the token from the url & we look it up in our DB', () => {
      it('deletes the new token if we find it in our db', (done) => {
        const expected = {
          valid: 'match',
          email: 's@mail.com',
          organisation: 'Oxfam'
        };

        checkTokenStub.read.withArgs('match').resolves(expected);
        req.query = {
          token: 'match'
        };

        instance.saveValues(req, res)
          // wrapped in a promise because this function has a promise
          // can't use eventually should have been called
          .then(() => {
            checkTokenStub.delete.should.have.been.calledWith('match');
            done();
          })
          .catch(err=> console.log(err));
      });

      it('sets a valid-token to true when we find it in our db', (done) => {
        const expected = {
          valid: 'match',
          email: 's@mail.com',
          organisation: 'Oxfam'
        };

        req.query = {
          token: 'match'
        };
        checkTokenStub.read.withArgs('match').resolves(expected);

        instance.saveValues(req, res)
          // wrapped in a promise because this function has a promise
          // can't use eventually should have been called
          .then(() => {
            req.sessionModel.set.should.have.been.calledWith('valid-token', true);
            done();
          })
          .catch(err=> console.log(err));
      });
      it('calls the parent when we find it', (done)=> {
        const expected = {
          valid: 'match',
          email: 's@mail.com',
          organisation: 'Oxfam'
        };

        req.query = {
            token: 'match'
          };
        checkTokenStub.read.withArgs('match').resolves(expected);

        instance.saveValues(req, res)
            // wrapped in a promise because this function has a promise
            // can't use eventually should have been called
          .then(() => {
            Base.prototype.saveValues.should.have.been.calledWith(req, res);
            done();
          })
          .catch(err=> console.log(err));
      });
      it('goes to an error page if we can not match it in our db', (done) => {
        const expected = {
          valid: undefined,
          email: undefined,
          organisation: undefined
        };

        req.query = {
            token: 'fail'
          };
        checkTokenStub.read.withArgs('fail').resolves(expected);

        instance.saveValues(req, res)
          // wrapped in a promise because this function has a promise
          // can't use eventually should have been called
          .then(() => {
            Base.prototype.saveValues.should.not.have.been.calledWith(req, res);
            done();
          })
          .catch(err=> console.log(err));
      });
    });
  });
});
