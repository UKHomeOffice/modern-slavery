'use strict';

process.env.PORT = 9080;
process.env.NOTIFY_KEY = 'UNIT_TEST';

const reqres = require('hof').utils.reqres;

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'))
  .use(require('chai-subset'));
chai.use(require('chai-shallow-deep-equal'));
global.should = chai.should();
global.expect = chai.expect;
global.assert = require('assert');
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.path = require('path');
global.config = require('../config');
global._ = require('lodash');
global.request = reqres.req;
global.response = reqres.res;

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
