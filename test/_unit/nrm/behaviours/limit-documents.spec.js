'use strict';

const Behaviour = require('../../../../apps/nrm/behaviours/limit-documents');
const Controller = require('hof').controller;


describe("apps/nrm 'limit-documents' behaviour should ", () => {
  let behaviour;
  let req;
  let res;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const LimitDocs = Behaviour(Controller);
    behaviour = new LimitDocs({ template: 'index', route: '/index' });
    behaviour._configure(req, res, done);
  });

  describe("The limit-documents '.validate' method", () => {
    it('returns a too many error if 100 files have already been added', () => {
      req.form.values.files = new Array(100);
      req.sessionModel.set('files', req.form.values.files);
      const files = req.sessionModel.get('files');
      req.form.values['upload-file'] =   {
        name: 'quaver.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144150
      };
      files.push(req.form.values['upload-file']);
      behaviour.validate(req, res, err => {
        err['upload-file'].should.be.an.instanceof(behaviour.ValidationError);
        err['upload-file'].should.have.property('type').and.equal('tooMany');
      });
    });
  });
});
