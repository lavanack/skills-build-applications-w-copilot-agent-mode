import { Router } from 'express';

import { UserModel } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ name: 1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;