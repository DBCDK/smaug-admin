import KoaRouter from 'koa-router';
import ReactDOM from 'react-dom/server';
import React from 'react';

// Utils
import {contactListToObject} from '../utils/contact.util';

//components
import ClientList from '../client/components/clientList/clientList.component';
import Client from '../client/components/clientForm/clientFormContainer.component';
import NewClient from '../client/components/createClient/newClient.component';
import LoginForm from '../client/components/loginForm/loginFormContainer.component';

// Templates
import {html} from './templates/html.template';

const router = new KoaRouter();

router.get('/', async (ctx, next) => {
  const state = {}
  try {
    const list = await ctx.api.getClientList();
    state.list = Array.isArray(list) && list || [];
  } catch(e) {
    state.error = "No contact to SMAUG";
    console.error(e);
  }

  ctx.body = html({
    title: 'Client List',
    state: state,
    content: ReactDOM.renderToString(<ClientList {...state} />),
    id: 'clientList'
  });
  return next();
});

router.get('/login', ctx => {
  ctx.body = html({
    title: 'Login to Smaug Admin',
    content: ReactDOM.renderToString(<LoginForm />),
    id: 'login'
  });
});

router.post('/login', ctx => {
  const config = ctx.request.body;
  // validate credentials
  // save data in session
  ctx.session.smaug = config;
  // use data in following requests
  // handle invalid credentials
  // redirect to frontpage
  ctx.redirect('/');
  ctx.body = JSON.stringify(config);
});


router.get('/client/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = await ctx.api.getClient(id);
  ctx.body = html({
    title: `Edit Client`,
    state: client,
    content: ReactDOM.renderToString(<Client {...client} />),
    id: 'clientform'
  });
  return next();
});

router.post('/client/:id', async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const client = await ctx.api.setClient(id, {name: body.name, config: JSON.parse(body.config), contact: contactListToObject(body.contact)});
  ctx.body = html({
    title: `Edit Client`,
    state: client,
    content: ReactDOM.renderToString(<Client {...client} />),
    id: 'clientform'
  });
  return next();
});


router.get('/add', async (ctx, next) => {
  ctx.body = html({
    title: `Create new client`,
    state: {},
    content: ReactDOM.renderToString(<Client />),
    id: 'clientform'
  });
  return next();
});

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body;
  const client = await ctx.api.createClient({name: body.name, config: JSON.parse(body.config), contact: contactListToObject(body.contact)});
  ctx.body = html({
    title: `New client created`,
    state: client,
    content: ReactDOM.renderToString(<NewClient {...client} />),
    id: 'newclient'
  });
  await next();
});

router.post('/remove/:id', async (ctx, next) => {
  const id = ctx.params.id;
  await ctx.api.deleteClient(id);
  ctx.redirect(`/`);
  await next();
});

export default router;
