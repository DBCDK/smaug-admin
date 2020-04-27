/**
 * @file
 * Create multible smaug clients at once. A script that will take a master configuration json object and a list of
 * clients containing configuration overwrites.
 *
 * Script arguments:
 * --clients
 * A file containing the clients that should be created on csv format
 *
 * --config
 * The default configuration in json format
 *
 * --cred
 * Smaug credentials e.g. admin:password
 *
 * --host
 * Smaug api host e.g. http:/localhost:3002
 *
 */

require('babel-register');
const argv = require('yargs')
  .demandCommand(1)
  .command('create', 'Bulk Create smaug clients', {
    baseClientId: {
      alias: 'b'
    },
    spreadSheetId: {
      alias: 's'
    },
    secretFile: {
      alias: 'f'
    }
  })
  .argv;

const command = argv._[0];
const methods = {
  create: require('./bulkCreate/bulkCreate').default
};

// eslint-disable-next-line no-console
methods[command] && methods[command](argv) || console.error(`Unsupported command ${command}`);
