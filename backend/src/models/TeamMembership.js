import mongoose from 'mongoose';

const teamMembershipSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

teamMembershipSchema.index(
  { owner: 1, team: 1, user: 1 },
  { unique: true }
);
teamMembershipSchema.index({ owner: 1, user: 1 });

export const TeamMembership = mongoose.model(
  'TeamMembership',
  teamMembershipSchema
);
