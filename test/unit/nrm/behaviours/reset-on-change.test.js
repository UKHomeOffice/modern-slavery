'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/reset-on-change');

describe('/apps/nrm/behaviours/reset-on-change', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
  }

  let req;
  let res;
  let sessionModel;
  let config;
  let instance;
  let next;
  let ResetOnChange;

  describe('process()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub(),
        reset: sinon.stub()
      };
      req = reqres.req({sessionModel});
      res = reqres.res();
      next = sinon.stub();
      config = {
        currentField: 'pv-under-age', storeFields: ['fr-location', 'user-organisation', 'user-email']
      };
      ResetOnChange = Behaviour(config)(Base);
      instance = new ResetOnChange();
      sinon.stub(Base.prototype, 'process');
    });
    afterEach(() => {
      Base.prototype.process.restore();
    });

    it('does NOT reset the session if we visit the page the first time', async() => {
      req.sessionModel.get.withArgs('steps').returns(['fr-location']);
      req.form = {
        options: {
          route: 'pv-under-age'
        }
      };

      await instance.process(req, res, next);
      expect(sessionModel.reset).to.have.not.been.called;
    });

    it('does NOT reset the session when the field has not changed from what was stored previously', async() => {
      req.sessionModel.get.withArgs('steps').returns(
        [
          'fr-location',
          'pv-under-age'
        ]);
      req.sessionModel.get.withArgs('pv-under-age').returns('yes');
      req.form = {
        values: {
          'pv-under-age': 'yes'
        },
        options: {
          route: 'pv-under-age'
        }
      };

      await instance.process(req, res, next);
      expect(sessionModel.reset).to.have.not.been.called;
    });

    describe('when the field has changed from what was previously stored', async() => {
      beforeEach(async() => {
        req.sessionModel.get.withArgs('steps').returns(
          [
            'fr-location',
            'pv-under-age'
          ]);
        req.sessionModel.get.withArgs('pv-under-age').returns('yes');
        req.form = {
          values: {
            'pv-under-age': 'no'
          },
          options: {
            route: 'pv-under-age'
          }
        };

        await instance.process(req, res, next);
      });

      it('resets the session', () => {
        expect(sessionModel.reset).to.have.been.called;
      });

      it('stores the field(s) from the previous page', () => {
        expect(sessionModel.set).to.have.been.calledWith('user-organisation');
        expect(sessionModel.set).to.have.been.calledWith('user-email');
        expect(sessionModel.set).to.have.been.calledWith('fr-location');
      });

      it('stores the steps', () => {
        expect(sessionModel.set).to.have.been.calledWith('steps',
          ['fr-location', 'pv-under-age']);
      });
    });
  });
});
