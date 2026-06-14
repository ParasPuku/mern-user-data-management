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

const toBoolean = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
};

const nodeEnv = process.env.NODE_ENV || 'development';

export const env = Object.freeze({
  nodeEnv,
  port: toNumber(process.env.PORT, 5001),
  mongoUri:
    process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/mern_user_data_management',
  corsOrigin: process.env.CORS_ORIGIN
    ? splitOrigins(process.env.CORS_ORIGIN)
    : ['http://localhost:5173', 'http://localhost:5174'],
  rateLimitWindowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: toNumber(process.env.RATE_LIMIT_MAX, 100),
  mongoServerSelectionTimeoutMs: toNumber(
    process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS,
    5000
  ),
  jwtSecret:
    process.env.JWT_SECRET ||
    'local-development-secret-change-before-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  authCookieName: process.env.AUTH_COOKIE_NAME || 'umd_auth',
  authCookieMaxAgeMs: toNumber(
    process.env.AUTH_COOKIE_MAX_AGE_MS,
    15 * 60 * 1000
  ),
  otpExpiresMinutes: toNumber(process.env.OTP_EXPIRES_MINUTES, 10),
  otpMaxAttempts: toNumber(process.env.OTP_MAX_ATTEMPTS, 5),
  redisConnectTimeoutMs: toNumber(process.env.REDIS_CONNECT_TIMEOUT_MS, 1000),
  redisEnabled: toBoolean(process.env.REDIS_ENABLED, true),
  redisKeyPrefix: process.env.REDIS_KEY_PREFIX || 'umd',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  syncIndexes: toBoolean(process.env.SYNC_INDEXES, nodeEnv !== 'production')
});
