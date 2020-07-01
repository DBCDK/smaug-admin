import request from 'superagent';
const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 60 * 60, useClones: false});

/**
 * Client for Stats.
 *
 * @constructor
 * Needs a config object like:
 *  {
 *    hejmdal: {
 *      url: "http://"
 *    },
 *    openplaftorm: {
 *      url: "http://"
 *    }
 *  }
 */
export default class StatsClient {
  constructor(config) {
    this.config = config;
  }

  static sum(data) {
    const res = {};

    Object.entries(data.clientList).forEach(([clientId, entry]) => {
      res[clientId] = {};
      Object.entries(entry).forEach(([path, statsForPath]) => {
        if (Array.isArray(statsForPath.daysum)) {
          res[clientId][path] = {
            last30: statsForPath.daysum.reduce(
              (total, day) => total + day.count,
              0
            )
          };
        }
      });
    });

    return res;
  }

  async getHejmdalStats() {
    const key = 'hejmdal_stats';
    if (cache.has(key)) {
      return cache.get(key);
    }
    const fetched = JSON.parse(
      (await request.get(this.config.hejmdal.url)).text
    );
    cache.set(key, fetched);
    return fetched;
  }

  async getOpenplatformStats() {
    const key = 'openplatform_stats';
    if (cache.has(key)) {
      return cache.get(key);
    }
    const fetched = JSON.parse(
      (await request.get(this.config.openplatform.url)).text
    );
    cache.set(key, fetched);
    return fetched;
  }

  async getHejmdal30summed() {
    const stats = await this.getHejmdalStats();
    return StatsClient.sum(stats);
  }

  async getOpenplatform30summed() {
    const stats = await this.getOpenplatformStats();
    return StatsClient.sum(stats);
  }
}
