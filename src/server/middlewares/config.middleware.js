import Config from '../../utils/config.util';

/**
 * Add config to context.
 *
 * @param ctx
 * @param next
 */
export default async function config(ctx, next) {
  if (!ctx.session.smaug) {
    ctx.session.smaug = Config.smaug;
  } else if (!ctx.session.smaug.uri) {
    ctx.session.smaug.uri = Config.smaug.uri;
  }
  await next();
}
