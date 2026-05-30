export const normalizeEmail = (email = '') => String(email).trim().toLowerCase();

export const normalizeMobile = (mobile = '') =>
  String(mobile).trim().replace(/[\s()-]/g, '');

export const isEmail = (value = '') => /^\S+@\S+\.\S+$/.test(value);

export const isMobile = (value = '') => /^\+?\d{7,15}$/.test(value);

export const normalizeIdentifier = (identifier = '') => {
  const value = String(identifier).trim();

  if (value.includes('@')) {
    return normalizeEmail(value);
  }

  return normalizeMobile(value);
};

export const maskIdentifier = (identifier = '') => {
  const normalized = normalizeIdentifier(identifier);

  if (normalized.includes('@')) {
    const [name, domain] = normalized.split('@');
    return `${name.slice(0, 2)}***@${domain}`;
  }

  return `${normalized.slice(0, 3)}***${normalized.slice(-2)}`;
};

