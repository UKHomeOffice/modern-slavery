'use strict';

const redis = sinon.stub();
const proxyquire = require('proxyquire');
const Model = proxyquire('../../../../apps/nrm/models/check-token',
  {'ioredis': redis});

describe('apps/nrm/models/check-token', () => {
  describe('read()', ()=> {
    beforeEach(() => {
      sinon.stub(redis.prototype, 'get');
    });
    afterEach(() => {
      redis.prototype.get.restore();
    });

    it('is a function', () => (typeof Model.read).should.equal('function'));

    it('returns true when it finds a token in redis', (done) => {

      redis.prototype.get.resolves('something');

      Model.read('test')
        .then((result) => {
            result.should.equal(true);
            done();
          })
          .catch(err=> console.log(err));
    });

    it('returns false when it does NOT find a token in redis', (done) => {
      redis.prototype.get.resolves(undefined);

      Model.read('test')
        .then((result) => {
            result.should.equal(false);
            done();
          })
          .catch(err=> console.log(err));
    });
  });

  describe('delete()', ()=> {
    it('is a function', () => (typeof Model.delete).should.equal('function'));
  });
});
