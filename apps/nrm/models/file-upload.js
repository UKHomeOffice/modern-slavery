'use strict';

const { model: Model } = require('hof');
const { v4: uuidv4 } = require('uuid');
const FormData = require('form-data');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuidv4());
  }

  async save() {
    try {
      const attributes = {
        url: config.upload.hostname
      };
      const urlObj = new URL(this.url(attributes));
      const formData = new FormData();
      formData.append('document', this.get('data'), {
        filename: this.get('name'),
        contentType: this.get('mimetype')
      });
      
      const reqConf = {
        url: urlObj.toString(),
        data: formData,
        method: 'POST',
        headers: {
          ...formData.getHeaders()
        }
      };

      const result = await this.request(reqConf, error => {
        // Callback will be called with the error if any is encountered during file load
        if (error) {
          // Throw error to be caught below.
          // Only throw if it exists since callback can also be called without error.
          throw error;
        }
      });

      // We expect the response to contain a URL, otherwise something went wrong
      if (!result.url) {
        const errorMsg = 'Did not receive a URL from file-vault';
        throw new Error(errorMsg);
      }

      this.set({ url: result.url });
      logger.info('Successfully saved data');
      return this.unset('data');
    } catch (err) {
      logger.error('Error uploading file: ', err);
      throw err;
    }
  }

  async auth() {
    try {
      if (!config.keycloak.token) {
        const errorMsg = 'keycloak token url is not defined';
        logger.error(errorMsg);
        throw new Error(errorMsg);
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
      logger.error('Error authenticating with keycloak:', error);
      throw error;
    }
  }
};
