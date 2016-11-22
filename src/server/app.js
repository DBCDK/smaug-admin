/**
 * @file
 * Configure and start our server
 */

// Libraries
import Koa from 'koa';
import bodyParser from 'koa-bodyParser';
import convert from 'koa-convert';
import serve from 'koa-static';

import router from './router';

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

app.use(bodyParser());
app.use(router.routes());
