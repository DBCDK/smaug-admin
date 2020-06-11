/**
 * @file
 * Parses rows from google spreadsheet
 */

/**
 * Parses rows in a sheet
 *
 * @param rows
 * @returns {*}
 */
export default function ClientParser(rows) {
  if (rows.length > 1) {
    const headers = rows.shift();
    return rows.map((row, i) => {
      const client = parseRow(row, headers);
      client.index = i + 1;
      return client;
    });
  }
}

/**
 * parses a single row
 *
 * @param row
 * @param headers
 * @returns {}
 */
function parseRow(row, headers) {
  const clientInfo = ['library', 'name', 'id', 'secret'];
  const configurations = headers.slice(clientInfo.length);
  const client = {
    config: {}
  };
  clientInfo.forEach(el => {
    client[el] = row.shift();
  });

  row.forEach((element, i) => {
    if (element) {
      let configPath = configurations[i];
      let value = element;
      if (element.includes('=')) {
        const list = element.split('=');
        configPath = list[0];
        value = list[1];
      }
      addValueToConfig(configPath, value, client.config);
    }
  });

  return client;
}

/**
 * Adds a value to config. Places value in config object based on a dot notation.
 *
 * @param path
 * @param value
 * @param config
 */
function addValueToConfig(path, value, config) {
  const pathList = path.split('.');
  deepPath(pathList, value, config);
}

/**
 * Traverse through config object.
 *
 * @param path
 * @param value
 * @param config
 */
function deepPath(path, value, config) {
  if (path.length === 1) {
    config[path[0]] = value;
  }
  else {
    config[path[0]] = config[path[0]] || {};
    deepPath(path.slice(1, path.length), value, config[path[0]]);
  }
}

