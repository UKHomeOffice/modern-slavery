'use strict';
const router = require('express').Router();

router.use('api/file-upload', require('./mocks/upload'));

module.exports = router;
