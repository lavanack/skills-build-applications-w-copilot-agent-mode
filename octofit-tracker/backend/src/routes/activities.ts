import { Router } from 'express';

import { ActivityModel } from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

export default router;