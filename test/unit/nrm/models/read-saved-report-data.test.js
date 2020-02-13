'use strict';

const dataService = {
  makeRequest: sinon.stub(),
  requestHeaders: sinon.stub(),
};

const proxyquire = require('proxyquire').noCallThru();
const Model = proxyquire('../../../../apps/nrm/models/read-saved-report-data',
{
  './data-service': dataService,
});

describe('apps/nrm/models/read-saved-report-data', () => {
  describe('readDataFromStore()', ()=> {
    it('makes request to data service when provided with the user email', async() => {
      const email = 'user@example.com';

      try {
        await Model(email);
        await expect(dataService.makeRequest).to.be.calledOnce;
      } catch (err) {
          throw new Error(err);
      }
    });
  });
});
