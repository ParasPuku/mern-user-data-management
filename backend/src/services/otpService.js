import { env } from '../config/env.js';
import { getRedisClient } from '../config/redis.js';
import { OtpToken } from '../models/OtpToken.js';
import { httpError } from '../utils/httpError.js';
import { maskIdentifier, normalizeIdentifier } from '../utils/identifiers.js';
import { compareOtpHash, generateOtp, hashOtp } from '../utils/otp.js';

const getOtpTtlSeconds = () => env.otpExpiresMinutes * 60;

const buildOtpRedisKey = (identifier, purpose) =>
  `${env.redisKeyPrefix}:otp:${purpose}:${encodeURIComponent(identifier)}`;

const logRedisOtpFallback = (error) => {
  console.warn(
    `[redis] OTP command failed: ${error?.message || 'Unknown Redis error'}. Falling back to MongoDB.`
  );
};

const createOtpPayload = ({ account, code, expiresAt, identifier, purpose }) => ({
  accountId: account._id.toString(),
  attempts: 0,
  codeHash: hashOtp(identifier, purpose, code),
  expiresAt: expiresAt.toISOString(),
  identifier,
  purpose
});

const clearMongoOtp = ({ account, identifier, purpose }) =>
  OtpToken.deleteMany({
    account: account._id,
    identifier,
    purpose,
    consumedAt: null
  });

const issueOtpWithMongo = async ({ account, code, expiresAt, identifier, purpose }) => {
  await clearMongoOtp({
    account,
    identifier,
    purpose
  });

  await OtpToken.create({
    account: account._id,
    identifier,
    purpose,
    codeHash: hashOtp(identifier, purpose, code),
    expiresAt
  });

  return {
    source: 'mongodb'
  };
};

const issueOtpWithRedis = async ({ account, code, expiresAt, identifier, purpose }) => {
  const redis = await getRedisClient();

  if (!redis) {
    return null;
  }

  await clearMongoOtp({
    account,
    identifier,
    purpose
  });

  await redis.set(
    buildOtpRedisKey(identifier, purpose),
    JSON.stringify(
      createOtpPayload({
        account,
        code,
        expiresAt,
        identifier,
        purpose
      })
    ),
    {
      EX: getOtpTtlSeconds()
    }
  );

  return {
    source: 'redis'
  };
};

const readRedisOtpPayload = async ({ identifier, purpose }) => {
  const redis = await getRedisClient();

  if (!redis) {
    return null;
  }

  const key = buildOtpRedisKey(identifier, purpose);
  const rawPayload = await redis.get(key);

  if (!rawPayload) {
    return {
      key,
      payload: null,
      redis
    };
  }

  let payload;

  try {
    payload = JSON.parse(rawPayload);
  } catch {
    await redis.del(key);
    return {
      key,
      payload: null,
      redis
    };
  }

  return {
    key,
    payload,
    redis
  };
};

const verifyOtpWithRedis = async ({ code, identifier, purpose }) => {
  const otpRecord = await readRedisOtpPayload({
    identifier,
    purpose
  });

  if (!otpRecord) {
    return null;
  }

  const { key, payload, redis } = otpRecord;

  if (!payload) {
    return null;
  }

  if (payload.attempts >= env.otpMaxAttempts) {
    throw httpError(429, 'Too many OTP attempts. Please request a new OTP');
  }

  const expectedHash = hashOtp(identifier, purpose, code);
  const isValid = compareOtpHash(payload.codeHash, expectedHash);

  if (!isValid) {
    const ttl = await redis.ttl(key);

    if (ttl <= 0) {
      await redis.del(key);
      throw httpError(400, 'OTP is invalid or expired');
    }

    await redis.set(
      key,
      JSON.stringify({
        ...payload,
        attempts: payload.attempts + 1
      }),
      {
        EX: ttl
      }
    );

    throw httpError(400, 'OTP is invalid or expired');
  }

  await redis.del(key);

  return payload;
};

const tryIssueOtpWithRedis = async (otpValues) => {
  try {
    return await issueOtpWithRedis(otpValues);
  } catch (error) {
    logRedisOtpFallback(error);
    return null;
  }
};

const verifyOtpWithMongo = async ({ code, identifier, purpose }) => {
  const token = await OtpToken.findOne({
    identifier,
    purpose,
    consumedAt: null,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  if (!token) {
    throw httpError(400, 'OTP is invalid or expired');
  }

  if (token.attempts >= env.otpMaxAttempts) {
    throw httpError(429, 'Too many OTP attempts. Please request a new OTP');
  }

  const expectedHash = hashOtp(identifier, purpose, code);
  const isValid = compareOtpHash(token.codeHash, expectedHash);

  if (!isValid) {
    token.attempts += 1;
    await token.save();
    throw httpError(400, 'OTP is invalid or expired');
  }

  token.consumedAt = new Date();
  await token.save();

  return token;
};

const tryVerifyOtpWithRedis = async (otpValues) => {
  try {
    return await verifyOtpWithRedis(otpValues);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    logRedisOtpFallback(error);
    return null;
  }
};

export const issueOtp = async ({ account, identifier, purpose }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  const otpStore =
    (await tryIssueOtpWithRedis({
      account,
      code,
      expiresAt,
      identifier: normalizedIdentifier,
      purpose
    })) ||
    (await issueOtpWithMongo({
      account,
      code,
      expiresAt,
      identifier: normalizedIdentifier,
      purpose
    }));

  console.info(
    `[DEV OTP] ${purpose} OTP for ${normalizedIdentifier}: ${code} (${otpStore.source})`
  );

  const result = {
    deliveryTarget: maskIdentifier(normalizedIdentifier),
    expiresAt
  };

  if (env.nodeEnv !== 'production') {
    result.devOtp = code;
  }

  return result;
};

export const verifyOtp = async ({ identifier, purpose, code }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const redisToken = await tryVerifyOtpWithRedis({
    code,
    identifier: normalizedIdentifier,
    purpose
  });

  if (redisToken) {
    return redisToken;
  }

  return verifyOtpWithMongo({
    code,
    identifier: normalizedIdentifier,
    purpose
  });
};
