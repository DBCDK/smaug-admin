const crypto = require('crypto');
const ddbSecretKey = process.env.DDB_KEY || 'DDBCMS';
const ddbPath = process.env.DDB_PATH || 'https://cmscontent.dbc.dk/web/';

/**
 * Create a DDMCMS config element.
 *
 * @param library
 * @returns {{}}
 * @constructor
 */
export default function DDBCMSConfig(library) {
  return {
    [library]: {
      ddbcms: {
        api: ddbPath,
        password: createDDBCMSPassword(library)
      }
    }
  };
}

/**
 * Create a DDBCMS mongo password
 *
 * @param library
 * @param secret
 * @returns {*}
 */
function createDDBCMSPassword(library, secret = ddbSecretKey) {
  const mongoKey = createSha1(library, secret);
  return createSha1(library, mongoKey);
}

/**
 * Create a sha1 of a library code and a secret
 *
 * @param library
 * @param mongoKey
 * @returns {*}
 */
function createSha1(library, secret) {
  return crypto
    .createHash('sha1')
    .update(`${library}${secret}`)
    .digest('hex');
}
