import mongoose, { Schema } from 'mongoose';

export interface Team {
  name: string;
  description: string;
  memberIds: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const TeamModel =
  mongoose.models.Team ?? mongoose.model<Team>('Team', teamSchema);
