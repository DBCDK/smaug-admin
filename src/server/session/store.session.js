/**
 * @file
 * Session store class
 */
import Redis from 'ioredis';
import {Store} from 'koa-session2';
import config from '../../utils/config.util';

export default class Sessiontore extends Store {
  constructor(connection) {
    super();
    this.redis = new Redis.Cluster([connection]);
  }

  async get(sid) {
    const data = await this.redis.get(`${config.session.key}:${sid}`);
    return JSON.parse(data);
  }

  async set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    await this.redis.set(
      `${config.session.key}:${opts.sid}`,
      JSON.stringify(session)
    );
    return opts.sid;
  }

  async destroy(sid) {
    return await this.redis.del(`${config.session.key}:${sid}`);
  }
}
