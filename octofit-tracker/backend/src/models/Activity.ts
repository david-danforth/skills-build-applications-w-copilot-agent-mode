import mongoose, { Schema } from 'mongoose';

export interface Activity {
  seedKey: string;
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'walking' | 'strength training' | 'cycling';
  durationMinutes: number;
  calories: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    seedKey: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength training', 'cycling'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ActivityModel =
  mongoose.models.Activity ?? mongoose.model<Activity>('Activity', activitySchema);
