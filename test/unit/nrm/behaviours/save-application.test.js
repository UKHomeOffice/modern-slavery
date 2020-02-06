'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const saveAndExitServiceStub = {
  sendDataToBeStored: sinon.stub(),
};

const Behaviour = proxyquire('../../../../apps/nrm/behaviours/save-application', {
  '../models/saved-data': saveAndExitServiceStub,
});

describe('/apps/nrm/behaviours/save-application', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
    getValues() {}
  }

  let sessionModel;
  let req;
  let res;
  let instance;
  let SaveApplication;

  let superLocals = {
    route: 'save-application',
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
      SaveApplication = Behaviour(Base);
      instance = new SaveApplication();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    xit('when the data is saved there is a value in sessionModel[\'application-id\']', async() => {
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

        saveAndExitServiceStub.sendDataToBeStored.withArgs(sessionData).resolves(response);

        await instance.getValues(req, res, ()=> {});

        expect(sessionModel.set).to.have.been.calledWith('application-id');
        expect(sessionModel.unset).to.have.been.calledWith('application-save-error');
    });

    // eslint-disable-next-line max-len
    it('when there is an error saving the data a value is stored in sessionModel[\'application-save-error\']', async() => {
      const sessionData = {
        'fr-location': 'england'
      };

      saveAndExitServiceStub.sendDataToBeStored.withArgs(sessionData).rejects(null);

      try {
        await instance.getValues(req, res, ()=> {});
      } catch (error) {
        expect(sessionModel.unset).to.have.been.calledWith('application-id');
        expect(sessionModel.set).to.have.been.calledWith('application-save-error');
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
      SaveApplication = Behaviour(Base);
      instance = new SaveApplication();
      sinon.stub(Base.prototype, 'locals').returns(superLocals);
    });
    afterEach(() => {
      superLocals = {
        route: 'save-application',
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with the applicationSavedSuccessfully variable', async() => {
      const expected = {
        route: 'save-application',
        applicationSavedSuccessfully: true,
      };

      req.sessionModel.get.withArgs('application-id').returns(true);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the applicationNotSaved variable', async() => {
      const expected = {
        route: 'save-application',
        applicationNotSaved: true,
      };

      req.sessionModel.get.withArgs('application-id').returns(undefined);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

  });
});
