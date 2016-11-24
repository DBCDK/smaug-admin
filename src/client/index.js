import ReactDOM from 'react-dom';
import React from 'react';

// Components
import Page from './components/page/pageContainer.component';

// Utils
import getComponentFromId from '../utils/getComponentFromId.util';

// Styling
import './scss/basic.scss';

const rootContainer = document.getElementById('content');
const pageData = JSON.parse(document.getElementById('pagedata').innerHTML || {});

const RootComponent = getComponentFromId(pageData.id || 'clientList');

const {state, ...pageState} = pageData;

ReactDOM.render(
  <Page {...pageState}>
    <RootComponent {...state}/>
  </Page>, rootContainer);
