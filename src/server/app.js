/**
 * @file
 * Configure and start our server
 */

// Libraries
import Koa from 'koa';
import session from 'koa-session2';
import bodyParser from 'koa-bodyParser';
import convert from 'koa-convert';
import serve from 'koa-static';

// routes
import router from './router';

//middlewares
import authenticate from './middlewares/authenticate.middleware';
import api from './middlewares/api.middleware';
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

// Apply middlewares
app.use(session());
app.use(bodyParser());
app.use(authenticate);
app.use(api);
app.use(router.routes());
