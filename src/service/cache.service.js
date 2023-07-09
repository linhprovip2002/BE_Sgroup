import redis from '../config/redis';
const time = 60 * 60 * 24 * 30;
class CacheService {
  async set (key, nestedKey, value) {
    try {
      if (!redis.isOpen) {
        await redis.connect();
      }
      await new Promise((resolve, reject) => {
        redis.set(key + ':' + nestedKey, JSON.stringify(value), { EX: time });
      });
    } catch (err) {
      console.log('Something went wrong:', err);
    } finally {
      redis.quit();
    }
  }

  async get (key, nestedKey) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    const value = await redis.get(key + ':' + nestedKey);
    await redis.quit();
    return JSON.parse(value);
  }

  async delete (key, nestedKey) {
    if (!redis.isOpen) {
      await redis.connect();
    }
    await redis.del(key + ':' + nestedKey);
    await redis.quit();
  }
}
export default new CacheService();
