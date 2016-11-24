export default async function authenticate(ctx, next) {
  if (!ctx.session.smaug.loggedIn && ctx.url !== '/login') {
    try {
      const result = await ctx.api.login();
      ctx.session.smaug.loggedIn = true;
    }
    catch(e) {
      console.log('it falied');
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
