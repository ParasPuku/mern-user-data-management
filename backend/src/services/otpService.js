import { env } from '../config/env.js';
import { OtpToken } from '../models/OtpToken.js';
import { httpError } from '../utils/httpError.js';
import { maskIdentifier, normalizeIdentifier } from '../utils/identifiers.js';
import { compareOtpHash, generateOtp, hashOtp } from '../utils/otp.js';

export const issueOtp = async ({ account, identifier, purpose }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await OtpToken.deleteMany({
    account: account._id,
    identifier: normalizedIdentifier,
    purpose,
    consumedAt: null
  });

  await OtpToken.create({
    account: account._id,
    identifier: normalizedIdentifier,
    purpose,
    codeHash: hashOtp(normalizedIdentifier, purpose, code),
    expiresAt
  });

  console.info(`[DEV OTP] ${purpose} OTP for ${normalizedIdentifier}: ${code}`);

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
  const token = await OtpToken.findOne({
    identifier: normalizedIdentifier,
    purpose,
    consumedAt: null,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  if (!token) {
    throw httpError(400, 'OTP is invalid or expired');
  }

  if (token.attempts >= 5) {
    throw httpError(429, 'Too many OTP attempts. Please request a new OTP');
  }

  const expectedHash = hashOtp(normalizedIdentifier, purpose, code);
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
