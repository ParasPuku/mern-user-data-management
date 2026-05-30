import mongoose from 'mongoose';

const otpTokenSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    identifier: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    purpose: {
      type: String,
      enum: ['login', 'password-reset'],
      required: true,
      index: true
    },
    codeHash: {
      type: String,
      required: true
    },
    attempts: {
      type: Number,
      default: 0
    },
    consumedAt: {
      type: Date,
      default: null
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpTokenSchema.index({ identifier: 1, purpose: 1, createdAt: -1 });

export const OtpToken = mongoose.model('OtpToken', otpTokenSchema);
