import SmaugClient from '../api/smaug.client';
import StatsClient from '../api/stats.client';

/**
 * Add smaug client api to context.
 *
 * @param ctx
 * @param next
 */
export default async function api(ctx, next) {
  ctx.api = new SmaugClient(ctx.session.smaug);
  ctx.statsApi = new StatsClient(ctx.session.stats);
  await next();
}
