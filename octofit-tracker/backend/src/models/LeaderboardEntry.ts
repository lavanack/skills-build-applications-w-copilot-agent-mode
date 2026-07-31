import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  userName: string;
  teamName: string;
  totalMinutes: number;
  totalCalories: number;
  rank: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    totalMinutes: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { collection: 'leaderboard', versionKey: false }
);

export const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);