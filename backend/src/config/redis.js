import { createClient } from 'redis';

import { env } from './env.js';

let redisClient = null;
let connectionPromise = null;
let lastConnectionErrorMessage = null;

const logRedisUnavailable = (error) => {
  const message = error?.message || 'Unable to connect to Redis';

  if (message === lastConnectionErrorMessage) {
    return;
  }

  lastConnectionErrorMessage = message;
  console.warn(`[redis] ${message}. Falling back to MongoDB where supported.`);
};

const createRedisClient = () => {
  const client = createClient({
    socket: {
      connectTimeout: env.redisConnectTimeoutMs,
      reconnectStrategy: false
    },
    url: env.redisUrl
  });

  client.on('error', logRedisUnavailable);

  return client;
};

export const getRedisClient = async () => {
  if (!env.redisEnabled) {
    return null;
  }

  if (!redisClient) {
    redisClient = createRedisClient();
  }

  if (redisClient.isReady) {
    return redisClient;
  }

  if (!connectionPromise) {
    connectionPromise = redisClient
      .connect()
      .then(() => redisClient)
      .catch((error) => {
        logRedisUnavailable(error);
        redisClient = null;
        return null;
      })
      .finally(() => {
        connectionPromise = null;
      });
  }

  return connectionPromise;
};

export const disconnectRedis = async () => {
  if (!redisClient?.isOpen) {
    redisClient = null;
    return;
  }

  await redisClient.quit();
  redisClient = null;
};
