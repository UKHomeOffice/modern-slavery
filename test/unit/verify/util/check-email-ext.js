'use strict';

const checkEmailExt = require('../../../../apps/verify/util/check-email-ext');

describe('/apps/verify/util/check-email-ext', () => {

  describe('isRecognised()', () => {
    it('returns false when the email ext is not in the string, `gov.uk|police.uk`', () => {
      const email = 's@mail.com';

      const result = checkEmailExt.isRecognised(email, 'gov.uk|police.uk');
      expect(result).equal(false);
    });
    it('returns true when the email ext is not in the string, `gov.uk|police.uk`', () => {
      const email = 's@mail.gov.uk';

      const result = checkEmailExt.isRecognised(email, 'gov.uk|police.uk');
      console.log('===>', result);
      expect(result).equal(true);
    });

    it('returns true when the email ext is not in the string, `gov.uk|police.uk`', () => {
      const email = 's@mail.police.uk';

      const result = checkEmailExt.isRecognised(email, 'gov.uk|police.uk');
      expect(result).equal(true);
    });
  });

  describe('getExtensionsString()', () => {
    it('returns a string without `|` and spaces when we provide one item in the list', () => {
      const expected = 'gov.uk';
      const extensionList = ['gov.uk'];

      const result = checkEmailExt.getExtensionsString(extensionList);
      expect(result).equal(expected);
    });

    it('returns a string from a list of 2 items separated by `|`', () => {
      const expected = 'gov.uk|police.uk';
      const extensionList = ['gov.uk', 'police.uk'];

      const result = checkEmailExt.getExtensionsString(extensionList);
      expect(result).equal(expected);
    });


    it('returns a string from a list of 3 items separated by `|`', () => {
      const expected = 'gov.uk|police.uk|nhs.uk';
      const extensionList = ['gov.uk', 'police.uk', 'nhs.uk'];

      const result = checkEmailExt.getExtensionsString(extensionList);
      expect(result).equal(expected);
    });
  });
  describe('isRecognised() & getExtensionsString() together', () => {
    it('returns false when the extension of the email is NOT in a list', () => {
      const extensionList = ['gov.uk', 'police.uk', 'nhs.uk'];
      const email = 's@mail.com';

      const extensionString = checkEmailExt.getExtensionsString(extensionList);
      const result = checkEmailExt.isRecognised(email, extensionString);
      expect(result).equal(false);
    });

    it('returns true when the extension of the email IS in a list', () => {
      const extensionList = ['gov.uk', 'police.uk', 'nhs.uk'];
      const email = 's@mail.gov.uk';

      const extensionString = checkEmailExt.getExtensionsString(extensionList);
      const result = checkEmailExt.isRecognised(email, extensionString);
      expect(result).equal(true);
    });
  });
});
