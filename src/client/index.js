/**
 * @file
 * Client side index file.
 */

import ReactDOM from 'react-dom';
import React, {useState} from 'react';

// Components
import Page from './components/page/pageContainer.component';

// Utils
import getComponentFromId from '../utils/getComponentFromId.util';

// Styling
import './scss/basic.scss';

const rootContainer = document.getElementById('content');
const pageData = JSON.parse(
  document.getElementById('pagedata').innerHTML || {}
);

const RootComponent = getComponentFromId(pageData.id || 'clientList');

const {state, ...pageState} = pageData;

const MainPage = () => {
  const [searchString, setSearchString] = useState(state.searchString || '');
  const onSearch = search => {
    window.location.pathname = '/find/' + encodeURIComponent(search);
    setSearchString(search);
  };
  return (
    <Page {...pageState} searchString={searchString} onSearch={onSearch}>
      <RootComponent {...state} searchString={searchString} />
    </Page>
  );
};

ReactDOM.render(<MainPage />, rootContainer);
