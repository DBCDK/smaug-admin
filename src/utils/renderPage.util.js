import ReactDOM from 'react-dom/server';
import React from 'react';
import getComponentFromId from './getComponentFromId.util';
import Page from '../client/components/page/pageContainer.component';
import {html} from '../server/templates/html.template';

function getMenuLinks(userLoggedIn) {
  const links = [
    {
      url: '/',
      display: 'Client List'
    },
    {
      url: '/add',
      display: 'Create Client'
    }
  ];
  if (userLoggedIn) {
    links.push({
      url: '/logout',
      display: 'Log out',
      classes: 'logout'
    });
  }
  return links;
}

export default function renderPage(id, title, userLoggedIn, state = {}) {
  const links = getMenuLinks(userLoggedIn);
  const Component = getComponentFromId(id);

  return html({
    id,
    title,
    links,
    state,
    userLoggedIn,
    content: ReactDOM.renderToString(
      <Page id={id} title={title} links={links}><Component {...state} /></Page>
    )
  });
}
