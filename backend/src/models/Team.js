import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      minlength: [2, 'Team name must be at least 2 characters'],
      maxlength: [80, 'Team name must be 80 characters or less']
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [240, 'Description must be 240 characters or less']
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
        delete ret.owner;
        return ret;
      }
    }
  }
);

teamSchema.index({ owner: 1, name: 1 }, { unique: true });

export const Team = mongoose.model('Team', teamSchema);
