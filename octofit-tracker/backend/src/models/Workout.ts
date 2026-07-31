import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  focusArea: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  recommendedForGoal: string;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: { type: [String], required: true },
    recommendedForGoal: { type: String, required: true },
  },
  { collection: 'workouts', versionKey: false }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);