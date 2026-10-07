import mongoose, { Schema } from 'mongoose';

export interface Workout {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  exercises: Array<{ name: string; sets: number; reps: number }>;
}

const workoutSchema = new Schema<Workout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true },
);

workoutSchema.index({ userId: 1, title: 1 }, { unique: true });

export const WorkoutModel =
  mongoose.models.Workout ?? mongoose.model<Workout>('Workout', workoutSchema);
