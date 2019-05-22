/* 'use strict';

const redis = sinon.stub();
const Model = require('../../../../apps/nrm/models/check-token');

describe.skip('apps/nrm/models/check-token', () => {
  describe('read()', ()=> {
    beforeEach(() => {
      sinon.stub(redis.prototype, 'get');
    });
    afterEach(() => {
      redis.prototype.get.restore();
    });

    it('is a function', () => (typeof Model.read).should.equal('function'));

    xit('returns a valid user when it finds a token in redis', (done) => {
      const token = 'test';
      redis.prototype.get.withArgs('token:test').returns(token);
      redis.prototype.get.withArgs('test:email').returns('s@mail.com');
      redis.prototype.get.withArgs('test:organisation').returns('Oxfam');

      const expected = {
        valid: 'test',
        email: 's@mail.com',
        organisation: 'Oxfam'
      };

      Model.setDataSource(redis);

      Model.read('test')
        .then((result) => {
          console.log(result);
            result.should.to.deep.equal(expected);
            done();
          })
          .catch(err=> console.log(err));
    });

    xit('returns user with no valid properties when it does NOT find a token in redis', (done) => {
      redis.prototype.get.resolves(undefined);

      const expected = {
        valid: undefined,
        email: undefined,
        organisation: undefined
      };

      Model.setDataSource(redis);

      Model.read('test')
        .then((result) => {
            result.should.to.deep.equal(expected);
            done();
          })
          .catch(err=> console.log(err));
    });
  });

  describe('delete()', ()=> {
    it('is a function', () => (typeof Model.delete).should.equal('function'));
  });
});
 */
