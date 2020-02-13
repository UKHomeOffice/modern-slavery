'use strict';

const dataService = {
  makeRequest: sinon.stub(),
  requestHeaders: sinon.stub(),
};

const proxyquire = require('proxyquire').noCallThru();
const Model = proxyquire('../../../../apps/nrm/models/write-saved-report-data',
{
  './data-service': dataService,
});

describe('apps/nrm/models/write-saved-report-data', () => {
  describe('sendDataToBeStored()', ()=> {
    it('makes request to data service when provided with report data', async() => {
      const data = {
        'user-email': 'user@example.com',
        'fr-location': 'england',
        'steps': '/start, /fr-location',
      };

      try {
        await Model(data);
        await expect(dataService.makeRequest).to.be.calledOnce;
      } catch (err) {
          throw new Error(err);
      }
    });
  });
});
