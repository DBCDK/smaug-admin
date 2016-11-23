export default async function authenticate(ctx, next) {
  if (!ctx.session.smaug && ctx.url !== '/login') {
    ctx.redirect('/login');
  }
  else if (ctx.session.smaug && ctx.url === '/login') {
    ctx.redirect('/');
  }
  else {
    await next();
  }
}