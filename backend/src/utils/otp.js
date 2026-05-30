import crypto from 'crypto';

import { env } from '../config/env.js';

export const generateOtp = () =>
  crypto.randomInt(100000, 1000000).toString();

export const hashOtp = (identifier, purpose, code) =>
  crypto
    .createHash('sha256')
    .update(`${identifier}:${purpose}:${code}:${env.jwtSecret}`)
    .digest('hex');

export const compareOtpHash = (actualHash, expectedHash) => {
  const actual = Buffer.from(actualHash);
  const expected = Buffer.from(expectedHash);

  return (
    actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
  );
};

