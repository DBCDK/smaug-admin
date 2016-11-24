const env = process.env;

export default {
  port: env.PORT || 1234,
  smaug: {
    uri: env.SMAUG_URI || 'http://localhost:3002',
    username: env.SMAUG_USER || 'admin',
    password: env.SMAUG_PASSWORD || 'password'
  }
};
