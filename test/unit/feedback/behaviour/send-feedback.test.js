'use strict';

const reqres = require('reqres');
const NotifyClient = require('notifications-node-client').NotifyClient;

const Behaviour = require('../../../../apps/feedback/behaviours/send-feedback');

describe('/apps/feedback/behaviours/send-feedback', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  let req;
  let res;
  let SendFeedback;
  let instance;

  class Base {
    saveValues() {}
  }

  beforeEach(() => {
    req = reqres.req();
    req.form = {
      values: {
      'feedback': 'Test Feedback Message'
      }
    };
    res = reqres.res();
    SendFeedback = Behaviour(Base);
    instance = new SendFeedback();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues');
      sinon.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
      NotifyClient.prototype.sendEmail.restore();
    });

    it('sends an email', async() => {
      await instance.saveValues(req, res, ()=> {});
      expect(NotifyClient.prototype.sendEmail).to.have.been.called;
    });

    it('calls the callback in super', async() => {
      const spy = sinon.spy();
      await instance.saveValues(req, res, spy);
      expect(Base.prototype.saveValues).to.have.been.called;
    });
  });
});
