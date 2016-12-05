export default async function authenticate(ctx, next) {
  if (!ctx.session.smaug.loggedIn && ctx.url !== '/login') {
    try {
      await ctx.api.login();
      ctx.session.smaug.loggedIn = true;
    }
    catch (e) {
      ctx.redirect('/login');
    }
  }
  if (ctx.session.smaug.loggedIn && ctx.url === '/login') {
    ctx.redirect('/');
  }
  else {
    await next();
  }
}
