/**
 * @file
 * Converts environment variables to a config object.
 */

const env = process.env; // eslint-disable-line no-process-env

export default {
  port: env.PORT || 1234,
  smaug: {
    uri: env.SMAUG_URI || 'http://smaug:3002',
    username: env.SMAUG_USER,
    password: env.SMAUG_PASSWORD
  },
  stats: {
    hejmdal: {
      url:
        env.STATS_HEJMDAL_URL ||
        'https://artifactory.dbc.dk/artifactory/fe-generic/metakompasset/hejmdal_daily.json'
    },
    openplatform: {
      url:
        env.STATS_OPENPLATFORM_URL ||
        'https://artifactory.dbc.dk/artifactory/fe-generic/metakompasset/openplatform_daily.json'
    }
  }
};
