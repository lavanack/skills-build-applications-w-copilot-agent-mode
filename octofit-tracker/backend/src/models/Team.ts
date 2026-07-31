import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  city: string;
  members: string[];
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    members: { type: [String], required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { collection: 'teams', versionKey: false }
);

export const TeamModel = model<Team>('Team', teamSchema);