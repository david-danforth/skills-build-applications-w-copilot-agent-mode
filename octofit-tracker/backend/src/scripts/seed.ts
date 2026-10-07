import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const user = UserModel;
const team = TeamModel;
const activity = ActivityModel;
const leaderboard = LeaderboardModel;
const workout = WorkoutModel;

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const seededEmails = [
      'avery.johnson@example.test',
      'maya.chen@example.test',
      'jordan.rivera@example.test',
    ];
    const seededTeamNames = ['Trailblazers', 'Power Pals'];
    const seededActivityKeys = [
      'avery-run',
      'avery-strength',
      'maya-walk',
      'maya-cycle',
      'jordan-run',
      'jordan-strength',
    ];
    const existingUsers = await user
      .find({ email: { $in: seededEmails } })
      .select('_id')
      .lean();
    const existingUserIds = existingUsers.map(({ _id }) => _id);

    await Promise.all([
      leaderboard.deleteMany({ userId: { $in: existingUserIds } }),
      workout.deleteMany({ userId: { $in: existingUserIds } }),
      activity.deleteMany({ seedKey: { $in: seededActivityKeys } }),
      user.deleteMany({ email: { $in: seededEmails } }),
      team.deleteMany({ name: { $in: seededTeamNames } }),
    ]);

    const [trailblazers, powerPals] = await team.create([
      {
        name: 'Trailblazers',
        description: 'A team focused on outdoor cardio and steady progress.',
        memberIds: [],
      },
      {
        name: 'Power Pals',
        description: 'A team building strength through consistent training.',
        memberIds: [],
      },
    ]);

    const [avery, maya, jordan] = await user.create([
      {
        email: 'avery.johnson@example.test',
        name: 'Avery Johnson',
        age: 16,
        fitnessLevel: 'intermediate',
        teamId: trailblazers._id,
      },
      {
        email: 'maya.chen@example.test',
        name: 'Maya Chen',
        age: 15,
        fitnessLevel: 'beginner',
        teamId: trailblazers._id,
      },
      {
        email: 'jordan.rivera@example.test',
        name: 'Jordan Rivera',
        age: 17,
        fitnessLevel: 'advanced',
        teamId: powerPals._id,
      },
    ]);

    await Promise.all([
      team.updateOne(
        { _id: trailblazers._id },
        { $set: { memberIds: [avery._id, maya._id] } },
      ),
      team.updateOne(
        { _id: powerPals._id },
        { $set: { memberIds: [jordan._id] } },
      ),
    ]);

    await activity.create([
      {
        seedKey: 'avery-run',
        userId: avery._id,
        type: 'running',
        durationMinutes: 28,
        calories: 245,
        points: 28,
        completedAt: new Date('2026-10-01T15:30:00.000Z'),
      },
      {
        seedKey: 'avery-strength',
        userId: avery._id,
        type: 'strength training',
        durationMinutes: 35,
        calories: 190,
        points: 35,
        completedAt: new Date('2026-10-03T15:30:00.000Z'),
      },
      {
        seedKey: 'maya-walk',
        userId: maya._id,
        type: 'walking',
        durationMinutes: 32,
        calories: 130,
        points: 16,
        completedAt: new Date('2026-10-02T15:30:00.000Z'),
      },
      {
        seedKey: 'maya-cycle',
        userId: maya._id,
        type: 'cycling',
        durationMinutes: 25,
        calories: 175,
        points: 25,
        completedAt: new Date('2026-10-04T15:30:00.000Z'),
      },
      {
        seedKey: 'jordan-run',
        userId: jordan._id,
        type: 'running',
        durationMinutes: 40,
        calories: 365,
        points: 40,
        completedAt: new Date('2026-10-03T15:30:00.000Z'),
      },
      {
        seedKey: 'jordan-strength',
        userId: jordan._id,
        type: 'strength training',
        durationMinutes: 42,
        calories: 260,
        points: 42,
        completedAt: new Date('2026-10-05T15:30:00.000Z'),
      },
    ]);

    await leaderboard.create([
      { userId: avery._id, teamId: trailblazers._id, points: 63, rank: 1 },
      { userId: jordan._id, teamId: powerPals._id, points: 82, rank: 2 },
      { userId: maya._id, teamId: trailblazers._id, points: 41, rank: 3 },
    ]);

    await workout.create([
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
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
