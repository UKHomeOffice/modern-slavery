'use strict';

const url = require('url');
const { model: Model } = require('hof');
const uuid = require('uuid').v4;
const FormData = require('form-data');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  async save() {
    try {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      reqConf.data = formData;
      reqConf.method = 'POST';
      reqConf.headers = {
        ...formData.getHeaders()
      };
      const result = await new Promise((resolve, reject) => {
        this.request(reqConf, (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });
      });
      await this.set({ url: result.url.replace('/file/', '/file/generate-link/').split('?')[0]});
      this.unset('data');
    } catch (error) {
      logger.error('Error in save method ', error);
    }
  }

  async auth() {
    try {
      if (!config.keycloak.token) {
        logger.error('keycloak token url is not defined');
        return {
          bearer: 'abc123'
        };
      }
      const tokenReq = {
        url: config.keycloak.token,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          username: config.keycloak.username,
          password: config.keycloak.password,
          grant_type: 'password',
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.secret
        },
        method: 'POST'
      };
      const response = await this._request(tokenReq);
      return { bearer: response.data.access_token };
    } catch (error) {
      logger.error('Error in auth method:', error);
      throw error;
    }
  }
};
