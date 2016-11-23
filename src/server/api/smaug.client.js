import request from 'superagent';

export default class SmaugClient {
  constructor(config) {
    console.log(config);
    this.config = config;
  }

  promiseRequest(method, uri, props = {}) {
    return new Promise((resolve, reject) => request[method](uri).auth(this.config.username, this.config.password).send(props).end((err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(res)
      }
    }));
  }

  getClientList() {
    return this.promiseRequest('get', `${this.config.uri}/clients/`).then(response => response.body);
  }

  getClient(id) {
    return this.promiseRequest('get', `${this.config.uri}/clients/${id}`).then(response => response.body);
  }

  setClient(id, props) {
    return this.promiseRequest('put', `${this.config.uri}/clients/${id}`, props).then(response => response.body);
  }

  createClient(props) {
    return this.promiseRequest('post', `${this.config.uri}/clients/`, props).then(response => response.body);
  }

  deleteClient(id) {
    return this.promiseRequest('delete', `${this.config.uri}/clients/${id}`).then(response => response.body);
  }
}