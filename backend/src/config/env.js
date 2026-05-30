import 'dotenv/config';

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const splitOrigins = (value) =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toNumber(process.env.PORT, 5001),
  mongoUri:
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/mern_user_data_management',
  corsOrigin: process.env.CORS_ORIGIN
    ? splitOrigins(process.env.CORS_ORIGIN)
    : ['http://localhost:5173'],
  rateLimitWindowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: toNumber(process.env.RATE_LIMIT_MAX, 100),
  mongoServerSelectionTimeoutMs: toNumber(
    process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS,
    5000
  )
});
