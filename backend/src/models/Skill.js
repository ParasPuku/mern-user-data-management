import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      minlength: [2, 'Skill name must be at least 2 characters'],
      maxlength: [80, 'Skill name must be 80 characters or less']
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
      maxlength: [80, 'Category must be 80 characters or less']
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

skillSchema.index({ owner: 1, name: 1 }, { unique: true });
skillSchema.index({ name: 'text', category: 'text' });

export const Skill = mongoose.model('Skill', skillSchema);
