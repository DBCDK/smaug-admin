/**
 * @file
 * Converts environment variables to a config object.
 */

const env = process.env; // eslint-disable-line no-process-env

export default {
  port: env.PORT || 1234,
  smaug: {
    uri: env.SMAUG_URI || 'http://smaug.frontend-staging.svc.cloud.dbc.dk:8001',
    username: env.SMAUG_USER || 'admin',
    password: env.SMAUG_PASSWORD || 'password_stg'
  }
};
