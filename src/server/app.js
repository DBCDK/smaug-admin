/**
 * @file
 * Configure and start our server
 */

// Libraries
import Koa from 'koa';
import KoaRouter from 'koa-router';

// Utils
//import {CONFIG, validateConfig} from './utils/config.util';
//import {log} from './utils/logging.util';

const app = new Koa();
app.name = 'Smaug Admin';
const PORT = 1234; //CONFIG.app.port;

//app.use(convert(serve('./static')));

app.on('error', (err) => {
  console.error('Server error', {error: err.message, stack: err.stack});
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}!`);
});



const router = new KoaRouter();

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', (ctx, next) => {
  ctx.body = 'up and running';
  return next();
});
