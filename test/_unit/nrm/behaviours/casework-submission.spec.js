'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const GetFileToken = {
  auth: sinon.stub()
};

const Model = {
  _request: sinon.stub()
};

const prepareStub = sinon
  .stub()
  .returns({ ExternalId: 'external-id', Type: 'type' });

const dbInsertStub = sinon.stub().resolves();

const configStub = {
  writeToCasework: true,
  audit: { enabled: true },
  aws: { sqs: 'https://sqs-url' },
  saveService: { host: 'http://localhost', port: '3000' }
};

const getConfigStub = () => ({
  writeToCasework: true,
  audit: { enabled: true },
  aws: { sqs: 'https://sqs-url' },
  saveService: { host: 'http://localhost', port: '3000' }
});

const Behaviour = proxyquire(
  '../../../../apps/nrm/behaviours/casework-submission',
  {
    '../models/file-upload': function () {
      return GetFileToken;
    },
    './../../common/db': () => dbInsertStub,
    '../../../config': configStub,
    '../../../lib/utilities': {
      encodeEmail: sinon.stub().returns('encoded-email')
    },
    hof: {
      model: function () {
        return Model;
      }
    },
    'sqs-producer': {
      create: sinon.stub().returns({
        send: sinon.stub().callsArgWith(1, null)
      })
    }
  }
)({ prepare: prepareStub });

describe('casework-submission behaviour tests', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    saveValues() {}
  }

  let req;
  let res;
  let sessionModel;
  let instance;

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub(),
      toJSON: sinon.stub()
    };
    req = reqres.req({ sessionModel });
    res = reqres.res();
    req.log = sinon.stub();
    req.headers = { 'x-forwarded-for': '127.0.0.1' };
    req.connection = { remoteAddress: '127.0.0.1' };

    instance = new (Behaviour(Base))();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').yields();
      GetFileToken.auth.resolves('token');
      sessionModel.get.withArgs('externalID').returns(null);
      sessionModel.get.withArgs('id').returns('report-id');
      dbInsertStub.resetHistory();
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    it('sets jsonPayload on sessionModel', async () => {
      await instance.saveValues(req, res, () => {
        sessionModel.set.should.have.been.calledWith(
          'jsonPayload',
          sinon.match.object
        );
      });
    });

    it('logs submission and queue status', async () => {
      await instance.saveValues(req, res, () => {
        req.log.should.have.been.calledWithMatch('info', sinon.match.string);
      });
    });

    it('calls db insert when audit is enabled', async () => {
      await instance.saveValues(req, res, () => {
        dbInsertStub.should.have.been.calledOnce;
      });
    });

    it('calls deleteSessionData after successful queue submission', async () => {
      const deleteSpy = sinon.spy(instance, 'deleteSessionData');
      await instance.saveValues(req, res, () => {
        deleteSpy.should.have.been.calledOnce;
        deleteSpy.restore();
      });
    });

    it('logs error and calls next with error if exception occurs', async () => {
      GetFileToken.auth.rejects(new Error('auth error'));
      const next = sinon.stub();
      await instance.saveValues(req, res, next);
      req.log.should.have.been.calledWithMatch('error', sinon.match.string);
      next.should.have.been.calledWithMatch(sinon.match.instanceOf(Error));
    });

    it('calls next with error if super.saveValues yields error', async () => {
      Base.prototype.saveValues.yields(new Error('save error'));
      const next = sinon.stub();
      await instance.saveValues(req, res, next);
      next.should.have.been.calledWithMatch(sinon.match.instanceOf(Error));
    });

    it('skips casework submission when writeToCasework is false', async () => {
      configStub.writeToCasework = false;
      const deleteSpy = sinon.spy(instance, 'deleteSessionData');
      await instance.saveValues(req, res, () => {
        deleteSpy.should.have.been.calledOnce;
        deleteSpy.restore();
      });
      configStub.writeToCasework = true;
    });

    it('skips audit logging when audit.enabled is false', async () => {
      configStub.audit.enabled = false;
      await instance.saveValues(req, res, () => {
        dbInsertStub.should.not.have.been.called;
      });
      configStub.audit.enabled = true;
    });

    it('calls next with error if db.insert fails', async () => {
      dbInsertStub.rejects(new Error('db error'));
      const next = sinon.stub();
      await instance.saveValues(req, res, next);
      next.should.have.been.calledWithMatch(sinon.match.instanceOf(Error));
    });

    it('send request when writeToCasework is true', async () => {
      const localConfigStub = getConfigStub();

      const sendStub = sinon.stub().callsArgWith(1, null);
      const producerMock = { send: sendStub };
      const createStub = sinon.stub().returns(producerMock);

      const BehaviourWithProducer = proxyquire(
        '../../../../apps/nrm/behaviours/casework-submission',
        {
          '../models/file-upload': function () {
            return GetFileToken;
          },
          './../../common/db': sinon.stub().returns({ insert: dbInsertStub }),
          '../../../config': localConfigStub,
          '../../../lib/utilities': {
            encodeEmail: sinon.stub().returns('encoded-email')
          },
          hof: {
            model: function () {
              return Model;
            }
          },
          'sqs-producer': { create: createStub }
        }
      )({ prepare: prepareStub });

      instance = new (BehaviourWithProducer(Base))();
      await instance.saveValues(req, res, () => {
        sendStub.should.have.been.calledOnce;
      });
    });

    it('logs audit when SQS submission succeeds and audit is enabled', async () => {
      const localConfigStub = getConfigStub();

      const sendStub = sinon.stub().callsArgWith(1, null);
      const producerMock = { send: sendStub };
      const createStub = sinon.stub().returns(producerMock);

      const BehaviourWithAudit = proxyquire(
        '../../../../apps/nrm/behaviours/casework-submission',
        {
          '../models/file-upload': function () {
            return GetFileToken;
          },
          './../../common/db': sinon.stub().returns({ insert: dbInsertStub }),
          '../../../config': localConfigStub,
          '../../../lib/utilities': {
            encodeEmail: sinon.stub().returns('encoded-email')
          },
          hof: {
            model: function () {
              return Model;
            }
          },
          'sqs-producer': { create: createStub }
        }
      )({ prepare: prepareStub });

      instance = new (BehaviourWithAudit(Base))();

      sessionModel.toJSON = sinon.stub().returns({
        ExternalId: 'external-id',
        Type: 'type'
      });
      sessionModel.get.withArgs('externalID').returns(null);
      sessionModel.get.withArgs('id').returns('report-id');

      sinon
        .stub(instance, 'deleteSessionData')
        .callsFake(async (_, next) => next());

      const next = sinon.stub();

      await instance.saveValues(req, res, next);

      dbInsertStub.should.have.been.calledOnce;
      dbInsertStub.should.have.been.calledWithMatch({
        ip: '127.0.0.1',
        type: 'type',
        success: true
      });

      next.should.have.been.calledOnce;
    });
  });

  describe('deleteSessionData()', () => {
    it('calls _request with correct params and logs success', async () => {
      Model._request.resolves();
      const next = sinon.stub();
      await instance.deleteSessionData(req, next);
      req.log.should.have.been.calledWith(
        'info',
        'MS: record deleted successfully'
      );
      next.should.have.been.calledOnce;
    });
  });
});
