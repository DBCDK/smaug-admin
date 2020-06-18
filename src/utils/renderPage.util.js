import ReactDOM from 'react-dom/server';
import React from 'react';
import getComponentFromId from './getComponentFromId.util';
import Page from '../client/components/page/pageContainer.component';
import {html} from '../server/templates/html.template';

/**
 * Helper function for wrapping a top component in a page layout.
 *
 * @param id
 * @param title
 * @param userLoggedIn
 * @param state
 * @returns {*}
 */
export default function renderPage(id, title, userLoggedIn, state = {}) {
  const Component = getComponentFromId(id);

  return html({
    id,
    title,
    state,
    userLoggedIn,
    content: ReactDOM.renderToString(
      <Page id={id} title={title}>
        <Component {...state} />
      </Page>
    )
  });
}
