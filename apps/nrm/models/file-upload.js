'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;

const config = require('../../../config');

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      reqConf.method = 'POST';
      return this.request(reqConf, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    })
      .then(result => {
        return this.set({
          url: result.url.replace('/file/', '/file/generate-link/').split('?')[0]
        });
      })
      .then(() => {
        return this.unset('data');
      });
  }

  auth() {
    if (!config.keycloak.token) {
      return Promise.reject(new Error('Keycloak token url is not defined'));
    }
    const tokenReq = {
      url: config.keycloak.token,
      form: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    return new Promise((resolve, reject) => {
      return this._request(tokenReq, (err, response) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          bearer: JSON.parse(response.body).access_token
        });
      });
    });
  }
};
