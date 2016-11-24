import SmaugClient from '../api/smaug.client';

export default async function api(ctx, next) {
  console.log(ctx.session, 'session');
  ctx.api = new SmaugClient(ctx.session.smaug);
  await next();
}
