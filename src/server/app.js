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
import {getClientList, getClient, setClient} from './dataFetcher/dataFetcher'
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

router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const client = await getClient(id);
  //console.log(client);
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  return next();
});

router.post('/:id', async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const client = await setClient(id, {name: body.name, config: JSON.parse(body.config)});
  console.log(client);
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  return next();
});

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const client = await setClient(id, {name: body.name, config: JSON.parse(body.config)});
  ctx.body = html({
    title: `Client with id ${id}`,
    state: client,
    id: 'client'
  });
  await next();
});

