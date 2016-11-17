/**
 * @file
 * Configure and start our server
 */

// Libraries
import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyParser';
import convert from 'koa-convert';
import serve from 'koa-static';

// Templates
import {html} from './templates/html.template';

// Utils
import {getClientList, getClient, setClient, createClient, deleteClient} from './dataFetcher/dataFetcher'
//import {CONFIG, validateConfig} from './utils/config.util';
//import {log} from './utils/logging.util';

const app = new Koa();
app.name = 'Smaug Admin';
const PORT = 1234; //CONFIG.app.port;

app.use(convert(serve('./public')));

app.on('error', (err) => {
  console.error('Server error', {error: err.message, stack: err.stack});
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}!`);
});



const router = new KoaRouter();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async (ctx, next) => {
  const list = await getClientList();
  ctx.body = html({
    title: 'Client List',
    state: {list},
    id: 'clientList'
  });
  return next();
});

router.get('/client/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = await getClient(id);
  console.log(client);
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  return next();
});

router.get('/add', async (ctx, next) => {
  ctx.body = html({
    title: `Creating new client`,
    state: {},
    id: 'client'
  });
  return next();
});

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body;
  const client = await createClient({name: body.name, config: JSON.parse(body.config), contact: parseContacts(body.contact)});
  console.log(client);
  ctx.redirect(`/${client.id}`);
  await next();
});

router.post('/remove/:id', async (ctx, next) => {
  const id = ctx.params.id;
  await deleteClient(id);
  ctx.redirect(`/`);
  await next();
});


router.post('/client/:id', async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  console.log(body.config, 'contact');
  const client = await setClient(id, {name: body.name, config: JSON.parse(body.config), contact: parseContacts(body.contact)});
  console.log(client);
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  return next();
});

function parseContacts(contactList) {
  const contacts = {};
  for(const contact of contactList) {
    const {role, ...info} = contact;
    if (role) {
      contacts[role] = info;
    }
  }
   return contacts;
}

