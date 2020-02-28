'use strict';

const cookie = require('../../../../apps/verify/models/cookie');

describe('/apps/verify/models/cookie', () => {
  describe('getNrmCookie()', () => {
    it('returns null when there is NO nrm cookie', () => {
      const cookies = {
        'seen-cookie-message': 'yes',
        'hof-wizard-sc': '1'
      };

      const result = cookie.getNrmCookie(cookies);
      expect(result).equal(null);
    });
    it('returns value of the nrm cookie', () => {
      const cookies = {
        'seen-cookie-message': 'yes',
        'hof-wizard-sc': '1',
        nrm: 'a99a22d4-5713-11ea-82b4-0242ac130003'
      };

      const result = cookie.getNrmCookie(cookies);
      expect(result).equal('a99a22d4-5713-11ea-82b4-0242ac130003');
    });
  });
});
