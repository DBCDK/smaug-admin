import ReactDOM from 'react-dom';
import React from 'react';
import clientList from './components/clientList/clientList.component';
import client from './components/clientForm/clientFormContainer.component';


function getRootComponent(pageId) {
  console.log(pageId);
  switch (pageId) {
    case 'client':
      return client;
    default:
      return clientList;
  }
}

const rootContainer = document.getElementById('content');
const pageData = JSON.parse(document.getElementById('pagedata').innerHTML || {});
console.log(pageData);

const rootComponent = getRootComponent(pageData.id || 'clientList');

ReactDOM.render(React.createElement(rootComponent, pageData.state), rootContainer);
