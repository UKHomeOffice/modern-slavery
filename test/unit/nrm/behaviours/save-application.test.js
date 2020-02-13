'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const saveAndExitServiceStub = {
  sendDataToBeStored: sinon.stub(),
};

const Behaviour = proxyquire('../../../../apps/nrm/behaviours/save-report', {
  '../models/saved-data': saveAndExitServiceStub,
});

describe('/apps/nrm/behaviours/save-report', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
    getValues() {}
  }

  let sessionModel;
  let applicationId;
  let req;
  let res;
  let instance;
  let SaveReport;

  let superLocals = {
    route: 'save-report',
  };

  describe('getValues()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub(),
        unset: sinon.stub(),
        toJSON: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      SaveReport = Behaviour(Base);
      instance = new SaveReport();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    xit('when the data is saved there is a value in sessionModel[\'report-id\']', async() => {
        const response = {
          rowCount: 1,
          rows: [
            {
              id: 1
            },
          ],
        };
        const sessionData = {
          'fr-location': 'england'
        };
        applicationId.returns(1);
        saveAndExitServiceStub.sendDataToBeStored.withArgs(sessionData).resolves(response);
        console.log(response);
        await instance.getValues(req, res, ()=> {});

        expect(sessionModel.set).to.have.been.calledWith('report-id');
        expect(sessionModel.unset).to.have.been.calledWith('report-save-error');
    });

    // eslint-disable-next-line max-len
    it('when there is an error saving the data a value is stored in sessionModel[\'report-save-error\']', async() => {
      const sessionData = {
        'fr-location': 'england'
      };

      saveAndExitServiceStub.sendDataToBeStored.withArgs(sessionData).rejects(null);

      try {
        await instance.getValues(req, res, ()=> {});
      } catch (error) {
        expect(sessionModel.unset).to.have.been.calledWith('report-id');
        expect(sessionModel.set).to.have.been.calledWith('report-save-error');
      }

  });
  });

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      SaveReport = Behaviour(Base);
      instance = new SaveReport();
      sinon.stub(Base.prototype, 'locals').returns(superLocals);
    });
    afterEach(() => {
      superLocals = {
        route: 'save-report',
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with the reportSavedSuccessfully variable', async() => {
      const expected = {
        route: 'save-report',
        reportSavedSuccessfully: true,
      };

      req.sessionModel.get.withArgs('report-id').returns(true);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the reportNotSaved variable', async() => {
      const expected = {
        route: 'save-report',
        reportNotSaved: true,
      };

      req.sessionModel.get.withArgs('report-id').returns(undefined);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

  });
});
