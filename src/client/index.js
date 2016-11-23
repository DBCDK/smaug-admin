import ReactDOM from 'react-dom';
import React from 'react';

// Components
import ClientList from './components/clientList/clientList.component';
import Client from './components/clientForm/clientFormContainer.component';
import Newclient from './components/createClient/newClient.component';
import LoginForm from './components/loginForm/loginFormContainer.component';

// Styling
import './scss/basic.scss';

function getRootComponent(pageId) {
  switch (pageId) {
    case 'clientform':
      return Client;
    case 'newclient':
      return Newclient;
    case 'login':
      return LoginForm;
    default:
      return ClientList;
  }
}

const rootContainer = document.getElementById('content');
const pageData = JSON.parse(document.getElementById('pagedata').innerHTML || {});

const rootComponent = getRootComponent(pageData.id || 'clientList');

ReactDOM.render(React.createElement(rootComponent, pageData.state), rootContainer);
