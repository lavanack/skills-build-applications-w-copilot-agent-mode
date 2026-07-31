import { Router } from 'express';

import { WorkoutModel } from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ title: 1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default router;