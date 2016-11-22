import request from 'superagent';
import config from '../../utils/config.util';

function promiseRequest(method, uri, props = {}) {
  return new Promise((resolve, reject) => request[method](uri).auth(config.smaug.user, config.smaug.password).send(props).end((err, res) => {
    if (err) {
      reject(err);
    }
    else {
      resolve(res)
    }
  }));
}


export function getClientList() {
  return promiseRequest('get', `${config.smaug.uri}/clients/`).then(response => response.body);
}

export function getClient(id) {
  return promiseRequest('get', `${config.smaug.uri}/clients/${id}`).then(response => response.body);
}

export function setClient(id, props) {
  return promiseRequest('put', `${config.smaug.uri}/clients/${id}`, props).then(response => response.body);
}

export function createClient(props) {
  return promiseRequest('post', `${config.smaug.uri}/clients/`, props).then(response => response.body);
}

export function deleteClient(id) {
  return promiseRequest('delete', `${config.smaug.uri}/clients/${id}`).then(response => response.body);
}
