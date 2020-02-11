'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const saveAndExitServiceStub = {
  readDataFromStore: sinon.stub(),
};

const Behaviour = proxyquire('../../../../apps/nrm/behaviours/get-saved-application', {
  '../models/saved-data': saveAndExitServiceStub,
});

describe('/apps/nrm/behaviours/get-saved-application', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
    getValues() {}
  }

  let sessionModel;
  let applicationData;
  let req;
  let res;
  let instance;
  let GetSavedApplication;

  /* let superLocals = {
    route: 'pv-under-age',
  }; */

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
      applicationData = sinon.stub();
      GetSavedApplication = Behaviour(Base);
      instance = new GetSavedApplication();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    xit('when the data is read there are values in sessionModel', async() => {
        const response = {
          rows: [
            {
              'id': 20,
              'user_email': 'test@example.com',
              'json_saved_data': '{"user-email":"test@example.com","fr-location":"england"}',
              'visited_pages': '/start, /fr-location',
            }
          ],
        };

        // const applicationId = 20;
        applicationData.returns(response.json_saved_data);
        saveAndExitServiceStub.readDataFromStore.withArgs(response.rows[0].user_email).resolves(response);
        console.log('RESPONSE: ', instance);
        await instance.getValues(req, res, ()=> {});
        expect(sessionModel.set).to.have.been.calledWith('application-read-success');
    });

    // eslint-disable-next-line max-len
    it('when there is an error saving the data a value is stored in sessionModel[\'application-save-error\']', async() => {
      const userEmail = 'test@example.com';

      saveAndExitServiceStub.readDataFromStore.withArgs(userEmail).rejects(null);

      try {
        await instance.getValues(req, res, ()=> {});
      } catch (error) {
        expect(sessionModel.unset).to.have.been.calledWith('application-read-success');
        expect(sessionModel.set).to.have.been.calledWith('application-read-error');
      }
    });
  });

});
