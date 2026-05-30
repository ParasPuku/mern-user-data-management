import { Account } from '../models/Account.js';
import { issueOtp, verifyOtp } from '../services/otpService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';
import {
  isEmail,
  isMobile,
  maskIdentifier,
  normalizeEmail,
  normalizeIdentifier,
  normalizeMobile
} from '../utils/identifiers.js';
import {
  clearAuthCookie,
  createAuthSession,
  createPasswordResetToken,
  setAuthCookie,
  verifyToken
} from '../utils/token.js';

const getSessionExpiresInMs = (sessionExpiresAt) =>
  sessionExpiresAt
    ? Math.max(new Date(sessionExpiresAt).getTime() - Date.now(), 0)
    : null;

const serializeAccount = (account, sessionExpiresAt = null) => ({
  ...account.toJSON(),
  sessionExpiresAt,
  sessionExpiresInMs: getSessionExpiresInMs(sessionExpiresAt)
});

const assertPassword = (password, confirmPassword = password) => {
  if (!password || password.length < 8) {
    throw httpError(400, 'Password must be at least 8 characters');
  }

  if (password !== confirmPassword) {
    throw httpError(400, 'Passwords do not match');
  }
};

const signInAccount = (res, account, statusCode = 200) => {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);

  res.status(statusCode).json({
    data: serializeAccount(account, session.expiresAt)
  });
};

const findAccountByIdentifier = async (identifier) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);

  if (!isEmail(normalizedIdentifier) && !isMobile(normalizedIdentifier)) {
    throw httpError(400, 'Enter a valid email or mobile number');
  }

  const account = await Account.findByIdentifier(normalizedIdentifier);

  if (!account) {
    throw httpError(404, 'No account found for this email or mobile number');
  }

  return {
    account,
    normalizedIdentifier
  };
};

export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, mobile, password, confirmPassword, termsAccepted } =
    req.body;

  assertPassword(password, confirmPassword);

  if (!termsAccepted) {
    throw httpError(400, 'Terms and policy must be accepted');
  }

  const account = new Account({
    fullName,
    email: normalizeEmail(email),
    mobile: normalizeMobile(mobile),
    termsAccepted
  });

  await account.setPassword(password);
  await account.save();

  signInAccount(res, account, 201);
});

export const signInWithPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!isEmail(normalizedEmail)) {
    throw httpError(400, 'Enter a valid email address');
  }

  const account = await Account.findOne({ email: normalizedEmail }).select(
    '+passwordHash'
  );

  if (!account || !(await account.validatePassword(password || ''))) {
    throw httpError(401, 'Invalid email or password');
  }

  signInAccount(res, account);
});

export const requestLoginOtp = asyncHandler(async (req, res) => {
  const { account, normalizedIdentifier } = await findAccountByIdentifier(
    req.body.identifier
  );

  const otp = await issueOtp({
    account,
    identifier: normalizedIdentifier,
    purpose: 'login'
  });

  res.json({
    data: {
      ...otp,
      message: `OTP generated for ${maskIdentifier(normalizedIdentifier)}`
    }
  });
});

export const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { identifier, code } = req.body;
  const { account, normalizedIdentifier } =
    await findAccountByIdentifier(identifier);

  await verifyOtp({
    identifier: normalizedIdentifier,
    purpose: 'login',
    code
  });

  signInAccount(res, account);
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { account, normalizedIdentifier } = await findAccountByIdentifier(
    req.body.identifier
  );

  const otp = await issueOtp({
    account,
    identifier: normalizedIdentifier,
    purpose: 'password-reset'
  });

  res.json({
    data: {
      ...otp,
      message: `Password reset OTP generated for ${maskIdentifier(
        normalizedIdentifier
      )}`
    }
  });
});

export const verifyPasswordResetOtp = asyncHandler(async (req, res) => {
  const { identifier, code } = req.body;
  const { account, normalizedIdentifier } =
    await findAccountByIdentifier(identifier);

  await verifyOtp({
    identifier: normalizedIdentifier,
    purpose: 'password-reset',
    code
  });

  res.json({
    data: {
      resetToken: createPasswordResetToken(account)
    }
  });
});

export const setPassword = asyncHandler(async (req, res) => {
  const { resetToken, password, confirmPassword } = req.body;

  assertPassword(password, confirmPassword);

  let payload;

  try {
    payload = verifyToken(resetToken, 'password-reset');
  } catch {
    throw httpError(400, 'Password reset session expired. Please try again');
  }

  const account = await Account.findById(payload.sub).select('+passwordHash');

  if (!account) {
    throw httpError(404, 'Account not found');
  }

  await account.setPassword(password);
  await account.save();
  clearAuthCookie(res);

  res.json({
    message: 'Password updated successfully'
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    data: serializeAccount(req.account, req.session?.expiresAt)
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, mobile } = req.body;

  if (fullName !== undefined) {
    req.account.fullName = fullName;
  }

  if (mobile !== undefined) {
    const normalizedMobile = normalizeMobile(mobile);

    if (!isMobile(normalizedMobile)) {
      throw httpError(400, 'Enter a valid mobile number');
    }

    req.account.mobile = normalizedMobile;
  }

  await req.account.save();

  res.json({
    data: serializeAccount(req.account, req.session?.expiresAt)
  });
});

export const uploadProfileAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw httpError(400, 'Avatar image is required');
  }

  req.account.avatarUrl = `/uploads/avatars/${req.file.filename}`;
  await req.account.save();

  res.json({
    data: serializeAccount(req.account, req.session?.expiresAt)
  });
});

export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);
  res.json({
    message: 'Logged out successfully'
  });
});
