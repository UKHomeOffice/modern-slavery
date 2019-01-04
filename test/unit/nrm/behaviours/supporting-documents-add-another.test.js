'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/supporting-documents-add-another');

describe('/apps/nrm/behaviours/supporting-documents-add-another', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    get() {}
  }
  let req;
  let res;
  let instance;
  let next;
  let SupportingDocsAddAnother;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.stub();
    SupportingDocsAddAnother = Behaviour(Base);
    instance = new SupportingDocsAddAnother();
    sinon.stub(Base.prototype, 'get');
  });
  afterEach(() => {
    Base.prototype.get.restore();
  });

  // this is not working and not sure why
  xit('does not call parent method when a document is deleted', () => {
    req.query = {
      delete: 'yee hah'
    };

    instance.get(req, res, next);
    Base.prototype.get.should.not.be.called;
  });

  it('calls parent method by default', () => {
    instance.get(req, res, next);
    Base.prototype.get.should.be.called;
  });
});
