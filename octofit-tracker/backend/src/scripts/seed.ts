import mongoose from 'mongoose';

import { ActivityModel } from '../models/Activity.js';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = [
      {
        name: 'Mona Patel',
        email: 'mona.patel@example.com',
        role: 'member',
        teamName: 'Velocity Vipers',
        fitnessGoal: 'Improve 5K pace',
      },
      {
        name: 'Diego Ramos',
        email: 'diego.ramos@example.com',
        role: 'captain',
        teamName: 'Summit Sprinters',
        fitnessGoal: 'Build endurance',
      },
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        role: 'member',
        teamName: 'Core Crushers',
        fitnessGoal: 'Increase strength',
      },
    ];

    const teams = [
      {
        name: 'Velocity Vipers',
        mascot: 'Lightning Bolt',
        city: 'Seattle',
        members: ['Mona Patel', 'Jordan Lee', 'Priya Shah'],
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Summit Sprinters',
        mascot: 'Mountain Peak',
        city: 'Denver',
        members: ['Diego Ramos', 'Sam Morgan', 'Taylor Brooks'],
        weeklyGoalMinutes: 1080,
      },
      {
        name: 'Core Crushers',
        mascot: 'Kettlebell',
        city: 'Austin',
        members: ['Avery Chen', 'Nina Carter', 'Owen Reed'],
        weeklyGoalMinutes: 840,
      },
    ];

    const activities = [
      {
        userEmail: 'mona.patel@example.com',
        teamName: 'Velocity Vipers',
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 410,
        activityDate: new Date('2026-07-29T14:30:00Z'),
      },
      {
        userEmail: 'diego.ramos@example.com',
        teamName: 'Summit Sprinters',
        type: 'Cycling',
        durationMinutes: 65,
        caloriesBurned: 720,
        activityDate: new Date('2026-07-30T12:00:00Z'),
      },
      {
        userEmail: 'avery.chen@example.com',
        teamName: 'Core Crushers',
        type: 'Strength Training',
        durationMinutes: 50,
        caloriesBurned: 360,
        activityDate: new Date('2026-07-31T10:15:00Z'),
      },
    ];

    const leaderboard = [
      {
        userName: 'Diego Ramos',
        teamName: 'Summit Sprinters',
        totalMinutes: 245,
        totalCalories: 2460,
        rank: 1,
      },
      {
        userName: 'Mona Patel',
        teamName: 'Velocity Vipers',
        totalMinutes: 218,
        totalCalories: 1985,
        rank: 2,
      },
      {
        userName: 'Avery Chen',
        teamName: 'Core Crushers',
        totalMinutes: 190,
        totalCalories: 1640,
        rank: 3,
      },
    ];

    const workouts = [
      {
        title: 'Tempo Run Builder',
        focusArea: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: ['Dynamic warmup', 'Tempo intervals', 'Cooldown jog'],
        recommendedForGoal: 'Improve 5K pace',
      },
      {
        title: 'Endurance Ride Ladder',
        focusArea: 'Endurance',
        difficulty: 'Intermediate',
        durationMinutes: 55,
        exercises: ['Easy spin', 'Cadence ladder', 'Recovery spin'],
        recommendedForGoal: 'Build endurance',
      },
      {
        title: 'Full-Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 40,
        exercises: ['Goblet squats', 'Push-ups', 'Rows', 'Plank holds'],
        recommendedForGoal: 'Increase strength',
      },
    ];

    await Promise.all([
      UserModel.insertMany(users),
      TeamModel.insertMany(teams),
      ActivityModel.insertMany(activities),
      LeaderboardEntryModel.insertMany(leaderboard),
      WorkoutModel.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
