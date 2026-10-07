import mongoose, { Schema } from 'mongoose';

export interface LeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardModel =
  mongoose.models.Leaderboard ??
  mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
