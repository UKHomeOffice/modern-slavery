'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/delete-on-change');

describe('/apps/nrm/behaviours/delete-on-change', () => {
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
  let DeleteOnChange;

  describe('process()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub(),
        unset: sinon.stub()
      };
      req = reqres.req({sessionModel});
      res = reqres.res();
      next = sinon.stub();
      config = {
        currentField: 'co-operate-with-police', deleteFields: ['fr-details', 'fr-alternative-contact']
      };
      DeleteOnChange = Behaviour(config)(Base);
      instance = new DeleteOnChange();
      sinon.stub(Base.prototype, 'process');
    });
    afterEach(() => {
      Base.prototype.process.restore();
    });

    it(
      'does NOT unset any session field values if we visit the page the first time',
      async() => {
        const currentSessionSteps = [
          'pv-want-to-submit-nrm',
          'does-pv-need-support',
          'pv-name',
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
        ];

        req.sessionModel.get.withArgs('steps').returns(currentSessionSteps);
        req.form = {
          options: {
            route: 'co-operate-with-police'
          }
        };

        await instance.process(req, res, next);
        expect(sessionModel.unset).to.have.not.been.called;
      }
    );

    it(
      'does NOT unset any session field values when the field has not changed from what was stored previously',
      async() => {
        const currentSessionSteps = [
          'pv-want-to-submit-nrm',
          'does-pv-need-support',
          'pv-name',
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
          'co-operate-with-police',
        ];

        req.sessionModel.get.withArgs('steps').returns(currentSessionSteps);
        req.sessionModel.get.withArgs('co-operate-with-police').returns('yes');
        req.form = {
          values: {
            'co-operate-with-police': 'yes'
          },
          options: {
            route: 'co-operate-with-police'
          }
      };

      await instance.process(req, res, next);
      expect(sessionModel.unset).to.have.not.been.called;
    });

    describe('when the current field has changed from what was previously stored', async() => {
      beforeEach(async() => {
        const currentSessionSteps = [
          'pv-want-to-submit-nrm',
          'does-pv-need-support',
          'pv-name',
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
          'co-operate-with-police',
        ];

        req.sessionModel.get.withArgs('steps').returns(currentSessionSteps);
        req.sessionModel.get.withArgs('co-operate-with-police').returns('yes');
        req.form = {
          values: {
            'co-operate-with-police': 'no'
          },
          options: {
            route: 'co-operate-with-police'
          }
        };

        await instance.process(req, res, next);
      });

      it('unsets the specified session values', () => {
        expect(sessionModel.unset).to.have.been.called;
      });

      it('deletes the field(s) within the subsequent pages', () => {
        expect(sessionModel.unset).to.have.been.calledWith('fr-details');
        expect(sessionModel.unset).to.have.been.calledWith('fr-alternative-contact');
      });
    });
  });
});
