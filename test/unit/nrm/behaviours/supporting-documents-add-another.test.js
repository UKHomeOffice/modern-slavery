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

  it('calls parent method if there is if a delete', () => {
    instance.get(req, res, next);
    Base.prototype.get.should.be.called;
  });
});
