'use strict';

const validators = require('../../../apps/common/validators');

describe('apps/common/validators', () => {
  it('should reject emails with spaces', () => {
    const result = [
      ' test@example.com',
      'test@example.com ',
      'test @ example.com',
      ' test@example.com ',
      't est @ example.com',
      'test\t@example.com'
    ].map(validators.isValidEmail);
    result.should.not.contain(true);
  });

  it('should accept emails with strange domain portions', () => {
    const result = [
      'test@example.com',
      'test@example.gov.uk',
      'test@subdomain.example.com',
      'test@example.international',
      'test@example.xn--kgbechtv',
      'test@example.测试'
    ].map(validators.isValidEmail);
    result.should.not.contain(false);
  });

  it('should accept emails with strange username portions', () => {
    const result = [
      'firstname.lastname@example.com',
      'FirstName.LastName@example.com',
      'firstname.o\'lastname@example.com',
      '"name"@example.com'
    ].map(validators.isValidEmail);
    result.should.not.contain(false);
  });
});
