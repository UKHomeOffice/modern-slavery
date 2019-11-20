'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/save-application');

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
  let ApplicationSaved;

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
      ApplicationSaved = Behaviour(Base);
      instance = new ApplicationSaved();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    it('when the data is saved there is a value in application-id within the sessionModel', async() => {
        await instance.getValues(req, res, ()=> {});
        expect(sessionModel.set).to.have.been.calledWith('application-id');
        expect(sessionModel.unset).to.have.been.calledWith('application-save-error');
    });
  });

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      ApplicationSaved = Behaviour(Base);
      instance = new ApplicationSaved();
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
