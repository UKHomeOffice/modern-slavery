'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/check-email-token');
const checkToken = require('../../../../apps/nrm/models/check-token');

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
      sinon.stub(checkToken, 'read');
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

    describe('we get the token from the url & we look it up in our DB', () => {
      it('deletes the new token if we find it in our db', (done) => {
        req.query = {
          token: 'match'
        };
        checkToken.read.withArgs('match').resolves(true);

        instance.getValues(req, res)
          // wrapped in a promise because this function has a promise
          // can't use eventually should have been called
          .then(() => {
            checkToken.delete.should.have.been.calledWith('match');
            done();
          })
          .catch(err=> console.log(err));
      });

      it('sets a valid-token to true when we find it in our db', (done) => {
        req.query = {
            token: 'match'
          };
          checkToken.read.withArgs('match').resolves(true);

          instance.getValues(req, res)
            // wrapped in a promise because this function has a promise
            // can't use eventually should have been called
            .then(() => {
              req.sessionModel.set.should.have.been.calledWith('valid-token', true);
              done();
            })
            .catch(err=> console.log(err));
      });
      it('calls the parent when we find it', (done)=> {
        req.query = {
            token: 'match'
          };
          checkToken.read.withArgs('match').resolves(true);

          instance.getValues(req, res)
            // wrapped in a promise because this function has a promise
            // can't use eventually should have been called
            .then(() => {
              Base.prototype.getValues.should.have.been.calledWith(req, res);
              done();
            })
            .catch(err=> console.log(err));
      });
      it('goes to an error page if we can not match it in our db', (done) => {
        req.query = {
            token: 'fail'
          };
          checkToken.read.withArgs('fail').resolves(false);

          instance.getValues(req, res)
            // wrapped in a promise because this function has a promise
            // can't use eventually should have been called
            .then(() => {
              Base.prototype.getValues.should.not.have.been.calledWith(req, res);
              done();
            })
            .catch(err=> console.log(err));
      });
    });
  });
});
