'use strict';

const checkTwoCollections = require('../../../../apps/nrm/util/check-list-with-object');

describe('apps/nrm/util/check-list-with-object', () => {

  it('returns false when it does not find items in a collection', () => {
    const obj = {'a': '', 'b': '', 'c': 1};
    const list = ['a', 'b'];

    const result = checkTwoCollections.compare(list, obj);
    result.should.equal(false);
  });

  it('returns true when it find items in a collection', () => {
    const obj = {'a': '', 'b': '', 'c': 1};
    const list = ['a', 'b', 'c'];

    const result = checkTwoCollections.compare(list, obj);
    result.should.equal(true);
  });
});
