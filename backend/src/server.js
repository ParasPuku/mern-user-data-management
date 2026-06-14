import { app } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';
import { disconnectRedis } from './config/redis.js';

const startServer = async () => {
  try {
    await connectDB(env.mongoUri, {
      serverSelectionTimeoutMs: env.mongoServerSelectionTimeoutMs,
      syncIndexes: env.syncIndexes
    });

    const server = app.listen(env.port, () => {
      console.log(`API server running on port ${env.port}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Closing server...`);

      server.close(async () => {
        await disconnectRedis();
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start API server');
    console.error(error);
    process.exit(1);
  }
};

startServer();
