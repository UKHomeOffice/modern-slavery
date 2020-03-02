'use strict';
const shortLifeToken = require('../../common/models/save-report-tokens');

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    try {
      if (req.sessionModel.get('save-report-token')) {
        return super.saveValues(req, res, next);
      }
      const token = req.query.token;
      const checkToken = await shortLifeToken.readUuid(token);
      if (checkToken) {
        req.sessionModel.set('save-report-token', true);
        req.sessionModel.set('save-report-token-email', checkToken[0].useremail);
      } else {
        return res.redirect('/save-report-token-err');
      }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`reading save report token ${error}`);
        return res.redirect('/save-report-token-err');
    }
    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
