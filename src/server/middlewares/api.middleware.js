import SmaugClient from '../api/smaug.client';

/**
 * Add smaug client api to context.
 *
 * @param ctx
 * @param next
 */
export default async function api(ctx, next) {
  ctx.api = new SmaugClient(ctx.session.smaug);
  await next();
}
