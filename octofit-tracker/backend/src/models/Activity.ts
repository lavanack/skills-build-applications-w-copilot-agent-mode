import { Schema, model } from 'mongoose';

export interface Activity {
  userEmail: string;
  teamName: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<Activity>(
  {
    userEmail: { type: String, required: true },
    teamName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities', versionKey: false }
);

export const ActivityModel = model<Activity>('Activity', activitySchema);