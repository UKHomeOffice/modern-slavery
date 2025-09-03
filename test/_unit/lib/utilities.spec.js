const { encodeEmail } = require('../../../lib/utilities');

describe('utilities ', () => {
  describe('encodeEmail', () => {
    it('should return encoded email', () => {
      expect(encodeEmail('test@test.com')).to.equal(
        '7465737440746573742e636f6d'
      );
    });
  });
});
