/**
 * @file
 * contains all koa routing in the application.
 */

import KoaRouter from 'koa-router';

// Utils
import {contactListToObject} from '../utils/contact.util';

// Server side rendering
import renderPage from '../utils/renderPage.util';

const router = new KoaRouter();

/**
 * Shows a list of service clients.
 */
router.get('/', async (ctx) => {
  const state = {};
  try {
    const list = await ctx.api.getClientList();
    state.list = Array.isArray(list) && list || [];
  }
  catch (e) {
    state.error = 'No contact to SMAUG';
  }

  ctx.body = renderPage('clientList', 'Client List', ctx.session.smaug.loggedIn, state);
});

/**
 * Login route.
 */
router.get('/login', ctx => {
  ctx.body = renderPage('login', 'Login to Smaug Admin', false, {uri: ctx.session.smaug.uri});
});

/**
 * Logout route
 */
router.get('/logout', ctx => {
  ctx.session.smaug = {};
  ctx.redirect('/login');
});

/**
 * Post login credentials.
 */
router.post('/login', ctx => {
  const body = ctx.request.body;
  try {
    ctx.api.login(body);
    ctx.session.smaug = body;
    ctx.redirect('/');
  }
  catch (e) {
    ctx.body = renderPage('login', 'Login to Smaug Admin', false, {...body, error: 'invalid credentials'});
  }
});

/**
 * Edit a single client.
 */
router.get('/client/:id', async (ctx) => {
  const id = ctx.params.id;
  const client = await ctx.api.getClient(id);
  ctx.body = renderPage('clientform', 'Edit Client', ctx.session.smaug.loggedIn, client);
});

/**
 * Post a single client.
 */
router.post('/client/:id', async (ctx) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const client = await ctx.api.setClient(id, {
    name: body.name,
    config: JSON.parse(body.config),
    contact: contactListToObject(body.contact)
  });
  ctx.body = renderPage('clientform', 'Edit Client', ctx.session.smaug.loggedIn, client);
});

/**
 * Get token for a client.
 */
router.get('/token/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const client = await ctx.api.getToken(id);
    ctx.body = client;
  }
  catch (e) {
    ctx.body = {error: 'invalid client id'};
  }

});

/**
 * Form for Creating new clients.
 */
router.get('/add', (ctx) => {
  ctx.body = renderPage('clientform', 'Create new client', ctx.session.smaug.loggedIn);
});

/**
 * Post a new client.
 */
router.post('/add', async (ctx) => {
  const body = ctx.request.body;
  const client = await ctx.api.createClient({
    name: body.name,
    config: JSON.parse(body.config),
    contact: contactListToObject(body.contact)
  });

  ctx.body = renderPage('newclient', 'New client created', ctx.session.smaug.loggedIn, client);
});

/**
 * Delete a client.
 */
router.post('/remove/:id', async (ctx) => {
  const id = ctx.params.id;
  console.log(`remove ${id}`);
  await ctx.api.deleteClient(id);
  ctx.redirect('/');
});

export default router;
