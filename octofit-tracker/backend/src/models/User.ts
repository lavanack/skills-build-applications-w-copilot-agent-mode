import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  role: string;
  teamName: string;
  fitnessGoal: string;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { collection: 'users', versionKey: false }
);

export const UserModel = model<User>('User', userSchema);