'use strict';

const router = require('express').Router();
// adds regular fields to req.body as per body-parser
// also adds uploaded files to req.files.
const busboy = require('busboy-body-parser');

router.use(busboy());

router.post('/', (req, res, next) => {
  if (req.files.document) {
    const s3mock = `http://s3.com/foo/${Math.random()}`;
    // eslint-disable-next-line no-console
    console.log(`returning s3 mock ${s3mock}`);
    res.json({'url': s3mock});
  } else {
    next(new Error('No file uploaded'));
  }
});

module.exports = router;
