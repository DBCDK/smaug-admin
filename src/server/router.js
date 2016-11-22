import KoaRouter from 'koa-router';

// Utils
import {getClientList, getClient, setClient, createClient, deleteClient} from './api/smaug.client'
import {contactListToObject} from '../utils/contact.util';

// Templates
import {html} from './templates/html.template';

const router = new KoaRouter();

router.get('/', async (ctx, next) => {
  const state = {}
  try {
    const list = await getClientList();
    state.list = Array.isArray(list) && list || [];
  } catch(e) {
    state.error = "No contact to SMAUG";
    console.error(e);
  }

  ctx.body = html({
    title: 'Client List',
    state: state,
    id: 'clientList'
  });
  return next();
});

router.get('/client/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = await getClient(id);
  ctx.body = html({
    title: `Edit Client`,
    state: client,
    id: 'client'
  });
  return next();
});

router.get('/add', async (ctx, next) => {
  ctx.body = html({
    title: `Create new client`,
    state: {},
    id: 'client'
  });
  return next();
});

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body;
  const client = await createClient({name: body.name, config: JSON.parse(body.config), contact: contactListToObject(body.contact)});
  ctx.body = html({
    title: `New client created`,
    state: client,
    id: 'newclient'
  });
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
  const client = await setClient(id, {name: body.name, config: JSON.parse(body.config), contact: contactListToObject(body.contact)});
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  return next();
});


export default router;
