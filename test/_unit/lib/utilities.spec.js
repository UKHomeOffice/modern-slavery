const proxyquire = require('proxyquire').noCallThru();
let utilities = require('./../../../lib/utilities');

describe('Utilities', function () {
  describe('NotifyClient', function () {
    let notify;

    beforeEach(() => {
      utilities = proxyquire('./../../../lib/utilities', {
        '../config': {
          govukNotify: { notifyApiKey: 'USE_MOCK' }
        }
      });
    });

    it('should return a mock instance if Notify key set to USE_MOCK', function () {
      notify = new utilities.NotifyClient();
      expect(notify.constructor.name).to.eql('NotifyMock');
    });

    it('should return a real Notify instance if Notify key not set to USE_MOCK', function () {
      utilities = proxyquire('./../../../lib/utilities', {
        '../config': {
          govukNotify: { notifyApiKey: '123456' }
        }
      });
      notify = new utilities.NotifyClient();
      expect(notify.constructor.name).to.eql('NotifyClient');
    });
  });
});
