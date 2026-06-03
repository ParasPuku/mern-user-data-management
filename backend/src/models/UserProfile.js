import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    employeeId: {
      type: String,
      default: '',
      trim: true,
      maxlength: [40, 'Employee ID must be 40 characters or less']
    },
    department: {
      type: String,
      default: '',
      trim: true,
      maxlength: [80, 'Department must be 80 characters or less']
    },
    location: {
      type: String,
      default: '',
      trim: true,
      maxlength: [120, 'Location must be 120 characters or less']
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: [500, 'Notes must be 500 characters or less']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        ret.userId = ret.user.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.owner;
        delete ret.user;
        return ret;
      }
    }
  }
);

userProfileSchema.index({ owner: 1, user: 1 }, { unique: true });

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);
