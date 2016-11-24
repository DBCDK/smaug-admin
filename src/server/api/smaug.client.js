import request from 'superagent';

export default class SmaugClient {
  constructor(config) {
    this.config = config;
  }

  promiseRequest(method, path, props = {}, config = this.config) {
    return new Promise((resolve, reject) => request[method](config.uri + path).auth(config.username, config.password).send(props).end((err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(res)
      }
    }));
  }

  getClientList() {
    return this.promiseRequest('get', `/clients/`).then(response => response.body);
  }

  getClient(id) {
    return this.promiseRequest('get', `/clients/${id}`).then(response => response.body);
  }

  setClient(id, props) {
    return this.promiseRequest('put', `/clients/${id}`, props).then(response => response.body);
  }

  createClient(props) {
    return this.promiseRequest('post', `/clients/`, props).then(response => response.body);
  }

  deleteClient(id) {
    return this.promiseRequest('delete', `/clients/${id}`).then(response => response.body);
  }

  login(config = this.config) {
    return this.promiseRequest('get', `/clients/`, {}, config).then(response => response.body);
  }
}
