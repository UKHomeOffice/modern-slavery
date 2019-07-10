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
        currentField: 'co-operate-with-police',
        deleteFields: [
          'fr-details-first-name',
          'fr-details-last-name',
          'fr-details-role',
          'fr-details-phone',
          'fr-alternative-contact',
        ],
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
        req.form = {
          values: {
            'co-operate-with-police': 'yes'
          },
        };

        await instance.process(req, res, next);
        expect(sessionModel.unset).to.have.not.been.called;
      }
    );

    it(
      'does NOT unset any session field values when the field has not changed from what was stored previously',
      async() => {
        req.sessionModel.get.withArgs('co-operate-with-police').returns('yes');
        req.form = {
          values: {
            'co-operate-with-police': 'yes'
          },
        };

        await instance.process(req, res, next);
        expect(sessionModel.unset).to.have.not.been.called;
    });

    describe('when the current field has changed from what was previously stored', async() => {
      beforeEach(async() => {
        req.sessionModel.get.withArgs('co-operate-with-police').returns('yes');
        req.form = {
          values: {
            'co-operate-with-police': 'no'
          },
        };

        await instance.process(req, res, next);
      });

      it('unsets the specified session values', () => {
        expect(sessionModel.unset).to.have.been.called;
      });

      it('deletes the field(s) within the subsequent pages', () => {
        expect(sessionModel.unset).to.have.been.calledWith('fr-details-first-name');
        expect(sessionModel.unset).to.have.been.calledWith('fr-details-last-name');
        expect(sessionModel.unset).to.have.been.calledWith('fr-details-role');
        expect(sessionModel.unset).to.have.been.calledWith('fr-details-phone');
        expect(sessionModel.unset).to.have.been.calledWith('fr-alternative-contact');
      });

    });
  });
});
