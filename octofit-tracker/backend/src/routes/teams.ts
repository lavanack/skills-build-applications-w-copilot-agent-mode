import { Router } from 'express';

import { TeamModel } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

export default router;