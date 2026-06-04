import mongoose from 'mongoose';

const userSkillSchema = new mongoose.Schema(
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
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
      index: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    yearsOfExperience: {
      type: Number,
      min: [0, 'Years of experience cannot be negative'],
      max: [60, 'Years of experience must be 60 or less'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

userSkillSchema.index({ owner: 1, user: 1, skill: 1 }, { unique: true });
userSkillSchema.index({ owner: 1, skill: 1 });
userSkillSchema.index({ owner: 1, user: 1 });

export const UserSkill = mongoose.model('UserSkill', userSkillSchema);
