import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const teams = await Promise.all([
      TeamModel.findOneAndUpdate(
        { name: 'Trailblazers' },
        {
          $set: {
            description: 'A team focused on outdoor cardio and steady progress.',
          },
          $setOnInsert: { memberIds: [] },
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      TeamModel.findOneAndUpdate(
        { name: 'Power Pals' },
        {
          $set: {
            description: 'A team building strength through consistent training.',
          },
          $setOnInsert: { memberIds: [] },
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
    ]);
    const [trailblazers, powerPals] = teams;

    const userSeeds = [
      {
        email: 'avery.johnson@example.test',
        name: 'Avery Johnson',
        age: 16,
        fitnessLevel: 'intermediate' as const,
        teamId: trailblazers._id,
      },
      {
        email: 'maya.chen@example.test',
        name: 'Maya Chen',
        age: 15,
        fitnessLevel: 'beginner' as const,
        teamId: trailblazers._id,
      },
      {
        email: 'jordan.rivera@example.test',
        name: 'Jordan Rivera',
        age: 17,
        fitnessLevel: 'advanced' as const,
        teamId: powerPals._id,
      },
    ];
    const users = await Promise.all(
      userSeeds.map(({ email, ...user }) =>
        UserModel.findOneAndUpdate(
          { email },
          { $set: user },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );
    const [avery, maya, jordan] = users;

    await Promise.all([
      TeamModel.updateOne(
        { _id: trailblazers._id },
        { $set: { memberIds: [avery._id, maya._id] } },
      ),
      TeamModel.updateOne(
        { _id: powerPals._id },
        { $set: { memberIds: [jordan._id] } },
      ),
    ]);

    const activitySeeds = [
      {
        seedKey: 'avery-run',
        userId: avery._id,
        type: 'running' as const,
        durationMinutes: 28,
        calories: 245,
        points: 28,
        completedAt: new Date('2026-10-01T15:30:00.000Z'),
      },
      {
        seedKey: 'avery-strength',
        userId: avery._id,
        type: 'strength training' as const,
        durationMinutes: 35,
        calories: 190,
        points: 35,
        completedAt: new Date('2026-10-03T15:30:00.000Z'),
      },
      {
        seedKey: 'maya-walk',
        userId: maya._id,
        type: 'walking' as const,
        durationMinutes: 32,
        calories: 130,
        points: 16,
        completedAt: new Date('2026-10-02T15:30:00.000Z'),
      },
      {
        seedKey: 'maya-cycle',
        userId: maya._id,
        type: 'cycling' as const,
        durationMinutes: 25,
        calories: 175,
        points: 25,
        completedAt: new Date('2026-10-04T15:30:00.000Z'),
      },
      {
        seedKey: 'jordan-run',
        userId: jordan._id,
        type: 'running' as const,
        durationMinutes: 40,
        calories: 365,
        points: 40,
        completedAt: new Date('2026-10-03T15:30:00.000Z'),
      },
      {
        seedKey: 'jordan-strength',
        userId: jordan._id,
        type: 'strength training' as const,
        durationMinutes: 42,
        calories: 260,
        points: 42,
        completedAt: new Date('2026-10-05T15:30:00.000Z'),
      },
    ];
    await Promise.all(
      activitySeeds.map(({ seedKey, ...activity }) =>
        ActivityModel.updateOne(
          { seedKey },
          { $set: activity, $setOnInsert: { seedKey } },
          { upsert: true, runValidators: true },
        ),
      ),
    );

    const leaderboardSeeds = [
      { userId: avery._id, teamId: trailblazers._id, points: 63, rank: 1 },
      { userId: jordan._id, teamId: powerPals._id, points: 82, rank: 2 },
      { userId: maya._id, teamId: trailblazers._id, points: 41, rank: 3 },
    ];
    await Promise.all(
      leaderboardSeeds.map((entry) =>
        LeaderboardModel.findOneAndUpdate(
          { userId: entry.userId },
          { $set: entry },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    const workoutSeeds = [
      {
        userId: avery._id,
        title: 'Balanced Cardio and Core',
        description: 'A moderate session to build endurance and core stability.',
        exercises: [
          { name: 'Jogging', sets: 1, reps: 20 },
          { name: 'Plank', sets: 3, reps: 30 },
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
        ],
      },
      {
        userId: maya._id,
        title: 'Beginner Full Body',
        description: 'A gentle introduction to strength and mobility exercises.',
        exercises: [
          { name: 'Brisk walk', sets: 1, reps: 15 },
          { name: 'Wall push-ups', sets: 2, reps: 8 },
          { name: 'Glute bridges', sets: 2, reps: 10 },
        ],
      },
      {
        userId: jordan._id,
        title: 'Strength and Conditioning',
        description: 'A focused circuit for strength, balance, and conditioning.',
        exercises: [
          { name: 'Lunges', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 15 },
          { name: 'Mountain climbers', sets: 3, reps: 20 },
        ],
      },
    ];
    await Promise.all(
      workoutSeeds.map(({ userId, title, ...workout }) =>
        WorkoutModel.findOneAndUpdate(
          { userId, title },
          { $set: workout },
          { upsert: true, returnDocument: 'after', runValidators: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
