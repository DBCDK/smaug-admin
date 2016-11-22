import ReactDOM from 'react-dom';
import React from 'react';
import ClientList from './components/clientList/clientList.component';
import Client from './components/clientForm/clientFormContainer.component';
import Newclient from './components/createClient/newClient.component';
import './scss/basic.scss';

function getRootComponent(pageId) {
  console.log(pageId);
  switch (pageId) {
    case 'client':
      return Client;
    case 'newclient':
      return Newclient;
    default:
      return ClientList;
  }
}

const rootContainer = document.getElementById('content');
const pageData = JSON.parse(document.getElementById('pagedata').innerHTML || {});
console.log(pageData);

const rootComponent = getRootComponent(pageData.id || 'clientList');

ReactDOM.render(React.createElement(rootComponent, pageData.state), rootContainer);
