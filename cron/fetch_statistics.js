/**
 * @file
 */

// import {CONFIG} from '../src/utils/config.util';
// https://kb.objectrocket.com/elasticsearch/how-to-aggregate-a-filtered-set-in-elasticsearch-using-nodejs

// const Logger = require('dbc-node-logger');
const getopts = require('getopts');
const fs = require('fs');
const ElasticSearch = require('elasticsearch');

// const host = 'https://zabbix:zabbix@elk.dbc.dk:9100/k8s-frontend-prod-*';
const hourSum = {
  "date_histogram": {
    "field": "timestamp",
    "calendar_interval": "1h",
    "time_zone": "Europe/Copenhagen",
    "min_doc_count": 1
  }
}
const daySum = {
  "date_histogram": {
    "field": "timestamp",
    "calendar_interval": "1d",
    "time_zone": "Europe/Copenhagen",
    "min_doc_count": 1
  }
}
const search = {
  size: 0,
  body: {
    "query": {bool: { filter: {}}},
    "aggs": {"hoursum": hourSum, "daysum": daySum}
  }
}
const now = new Date();

/* -- main ----------------------------------------------------------------------------------- */

const [host, filters, outfile, monthly] = getFileInfoOrDie(process.argv.slice(2));
try {
  oFilters = JSON.parse(filters);
} catch (e) {
  usage('filter(s) should be valid json\n - ' + filters + '\n - ' + e.message);
}
console.log('Start at', now);
client = new ElasticSearch.Client({
  host: host
});

if (monthly) {
  console.log('Get monthly stats');
  search.body.query.bool.filter = setQueryFilter(oFilters, now.toISOString().slice(0,8) + '01', now.toISOString().slice(0,10));
}
else {
  console.log('Get last 30 days');
  search.body.query.bool.filter = setQueryFilter(oFilters, "2000-01-01", "9999-12-31");
}
console.log('Search:', JSON.stringify(search, null, 2));
client.search(search).then(function(resp) {
  const res = Object.assign({created: now}, {filter: oFilters}, {sums: parseResult(resp)});
  writeFile(outfile, JSON.stringify(res, null, 2));
  console.log('End at', new Date());
}, function(err) {
  console.trace(err.message);
});

/* -- helpers ----------------------------------------------------------------------------------- */
function parseResult(eResult) {
  const daySum = [];
  eResult.aggregations.daysum.buckets.forEach(obj => {
    date = new Date(obj.key_as_string);
    daySum.push({date: date.toISOString(), count: obj.doc_count});
  });
  const hourSum = [];
  eResult.aggregations.hoursum.buckets.forEach(obj => {
    hourSum.push({date: obj.key_as_string, count: obj.doc_count});
  });
  return {daySum: daySum, hourSum: hourSum};
}

/*
  const query = {
  "bool": {
    "filter": [
      {"match_phrase": {"app": "hejmdal"}},
      {"match_phrase": {"level": "INFO"}},
      {"match_phrase": {"baseUrl": "/login"}},
      {"range": {
          "timestamp": {
            "gte": "2020-05-01",
            "lte": "2020-05-31",
            "format": "strict_date_optional_time"
          }
        }
      }
    ]
  }
}
*/
function setQueryFilter(filters, from, to) {
  const filter = [];
  filter.push({range: {timestamp:{gte:from, lte:to, format:"strict_date_optional_time"}}});
  Object.keys(filters).forEach(val => {
    filter.push({match_phrase:{[val]:filters[val]}})
  })
  return filter;
}

function writeFile(fileName, buffer) {
  try {
    return fs.writeFileSync(fileName, buffer);
  } catch (err) {
    usage('Cannot write ' + fileName);
  }
}

function getFileInfoOrDie(args) {
  const options = getopts(args, {
    alias: {
      host: 'h',
      filter: 'f',
      output: 'o',
      monthly: 'm'
    }
  });
  if (!options['h']) {
    usage('missing host');
  }
  if (!options['o']) {
    usage('missing fileinfo');
  }
  if (!options['f']) {
    usage('missing filter(s)');
  }
  return [options['h'], options['f'], options['o'], options['m']];
}

function usage(error) {
  const errorTxt = error ? '\nError: ' + error + '\n\n' : '';
  console.log(
    'Create a json file with day and hours sums for last 30-ish days.\n' +
    'Option -m will only produce sums for the current month (normally used on the last day of each month)' +
    '\n%sUsage \n %s [options]\n\n' +
    'Options:\n' +
    ' -h [ElasticSearch host] -s [filter(s)] -o  output [json-file] -m\n',errorTxt, __filename);
  process.exit(1);
}

