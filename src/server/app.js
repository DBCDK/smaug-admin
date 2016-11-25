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

// import config
import config from '../utils/config.util';

// import routes
import router from './router';

// import middlewares
import authenticate from './middlewares/authenticate.middleware';
import apiToContext from './middlewares/api.middleware';
import configtoContext from './middlewares/config.middleware';

const app = new Koa();
app.name = 'Smaug Admin';
const PORT = config.port;

app.on('error', (err) => {
  console.error('Server error', {error: err.message, stack: err.stack});
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}!`);
});

// Apply middlewares
app.use(convert(serve('./public')));
app.use(session());
app.use(bodyParser());
app.use(configtoContext);
app.use(apiToContext);
app.use(authenticate);
app.use(router.routes());
