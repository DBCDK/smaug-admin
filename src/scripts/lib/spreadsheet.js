/**
 * @file
 * Methods to get/update a google spreadsheet
 */

import googleApi from 'googleapis';

export default class SpreadSheet {
  constructor(auth, spreadsheetId) {
    this.auth = auth;
    this.spreadsheetId = spreadsheetId;
  }

  get(range) {
    return this.call('get', {
      range
    });
  }

  update(range, value) {
    return this.call('update', {
      range,
      value_input_option: 'RAW',
      resource: {
        values: [[value]]
      }
    });
  }

  call(method, params) {
    return new Promise((resolve, reject) => {
      const options = Object.assign({}, {
        auth: this.auth,
        spreadsheetId: this.spreadsheetId
      }, params);
      googleApi.sheets('v4').spreadsheets.values[method](options, (err, response) => err && reject(err) || resolve(response && response.values || response));
    });
  }
}
