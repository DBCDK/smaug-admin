import path from 'path';
import authorize from '../lib/authorize';
import Spreadsheet from '../lib/spreadsheet';
import SmaugClient from '../../server/api/smaug.client';
import clientParser from '../lib/configParser';
import DDBCMSConfig from '../lib/ddbcms';

const smaugClient = new SmaugClient({
  uri: process.env.SMAUG_URI || 'http://localhost:3002',
  username: process.env.SMAUG_USER || 'admin',
  password: process.env.SMAUG_PASSWORD || 'password'
});


export default async({baseClientId, spreadSheetId, secretFile}) => {
  try {
    const secret = require(path.join(process.cwd(), secretFile));
    const auth = await authorize(secret);
    const baseClient = await smaugClient.getClient(baseClientId);
    const sheetApi = new Spreadsheet(auth, spreadSheetId);
    const values = await sheetApi.get('Napp');
    clientParser(values).forEach(client => {
      const newClient = wrapClientInBaseClient(client, baseClient);
      upsertClient(client, newClient, sheetApi);

    });
  }
  catch (e) {
    console.error('create failed', e);
  }
};

function wrapClientInBaseClient(client, baseClient) {
  return {
    name: client.name,
    config: Object.assign({}, baseClient.config, client.config, DDBCMSConfig(client.library)),
    contact: baseClient.contact
  };
}

async function upsertClient(client, newClient, sheetApi) {
  if (client.id) {
    smaugClient.setClient(client.id, newClient);
  }
  else {
    const response = await smaugClient.createClient(newClient);
    const addHeaderToIndex = 1;
    sheetApi.update(`Napp!C${client.index + addHeaderToIndex}`, response.id);
    sheetApi.update(`Napp!D${client.index + addHeaderToIndex}`, response.secret);
  }
}
