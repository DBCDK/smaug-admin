export default async function authenticate (ctx, next) {
  await next();
}