import request from 'superagent';

function promiseRequest(method, uri, props = {}) {
  return new Promise(resolve => request[method](uri).auth('admin', 'password').send(props).end((err, res) => resolve(res)));
}


export function getClientList() {
  return promiseRequest('get', 'http://localhost:3002/clients/').then(response => response.body);
}

export function getClient(id) {
  return promiseRequest('get', `http://localhost:3002/clients/${id}`).then(response => response.body);
}

export function setClient(id, props) {
  return promiseRequest('put', `http://localhost:3002/clients/${id}`, props).then(response => response.body);
}

export function createClient(props) {
  return promiseRequest('post', `http://localhost:3002/clients/`, props).then(response => response.body);
}
