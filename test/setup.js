/* eslint no-process-env: 0 */
'use strict';

require('dotenv').config();
global.reqres = require('hof').utils.reqres;
process.env.AWS_SQS = 'test-queue';
process.env.DELETION_TIMEOUT = 28;
process.env.SESSION_SECRET = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'));
chai.use(require('chai-shallow-deep-equal'));
global.should = chai.should();
global.expect = chai.expect;
global.assert = require('assert');
global.sinon = require('sinon');

const utils = require('./helpers/supertest_session/supertest-utilities.js');
global.getSupertestApp = (subApp, subAppPath, pages) => utils.getSupertestApp(subApp, subAppPath, pages);

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
