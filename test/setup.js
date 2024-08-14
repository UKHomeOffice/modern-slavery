/* eslint no-process-env: 0 */
'use strict';

require('dotenv').config();
process.env.AWS_SQS = 'test-queue';
process.env.DELETION_TIMEOUT = 28;

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
