'use strict';

const redis = sinon.stub();
const proxyquire = require('proxyquire').noCallThru();
const Model = proxyquire('../../../../apps/nrm/models/check-token',
{
  '../../../redis': redis,
});

describe('apps/nrm/models/check-token', () => {
  describe('read()', ()=> {
    beforeEach(() => {
      sinon.stub(redis, 'get');
    });

    afterEach(() => {
      redis.get.restore();
    });

    it('is a function', () => {
      expect(Model.read).to.be.a('function');
    });

    it('returns a valid user when it finds a token in redis', async() => {
      const token = 'test';
      redis.get.withArgs('token:test').returns(token);
      redis.get.withArgs('test:email').returns('s@mail.com');

      const expected = {
        valid: 'test',
        email: 's@mail.com'
      };

      try {
        const result = await Model.read('test');
        await expect(result).to.deep.equal(expected);
      } catch (err) {
          throw new Error(err);
      }
    });

    it('returns user with no valid properties when it does NOT find a token in redis', async() => {
      redis.get.resolves(undefined);

      const expected = {
        valid: undefined,
        email: undefined
      };

      try {
        const result = await Model.read('test');
        await expect(result).to.deep.equal(expected);
      } catch (err) {
          throw new Error(err);
      }
    });
  });

  describe('delete()', ()=> {
    it('is a function', () => {
      expect(Model.delete).to.be.a('function');
    });
  });
});
