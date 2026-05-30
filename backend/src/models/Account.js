import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { normalizeEmail, normalizeMobile } from '../utils/identifiers.js';

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name must be 100 characters or less']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email must be valid']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      match: [/^\+?\d{7,15}$/, 'Mobile number must be valid']
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    termsAccepted: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: 'Terms and policy must be accepted'
      }
    },
    avatarUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

accountSchema.pre('validate', function normalizeAccount(next) {
  if (this.email) {
    this.email = normalizeEmail(this.email);
  }

  if (this.mobile) {
    this.mobile = normalizeMobile(this.mobile);
  }

  next();
});

accountSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 12);
};

accountSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

accountSchema.statics.findByIdentifier = function findByIdentifier(identifier) {
  const value = String(identifier).trim();

  if (value.includes('@')) {
    return this.findOne({ email: normalizeEmail(value) });
  }

  return this.findOne({ mobile: normalizeMobile(value) });
};

export const Account = mongoose.model('Account', accountSchema);

