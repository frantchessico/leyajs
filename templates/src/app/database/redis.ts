import Redis from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as unknown as number,
    password: process.env.REDIS_PASSWORD,
});


async function getRedisValue(key: string) {
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function setRedisValue(key: string, value: string, expirationSeconds: number) {
  try {
    return await redisClient.set(key, value, 'EX', expirationSeconds);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { redisClient, getRedisValue, setRedisValue };