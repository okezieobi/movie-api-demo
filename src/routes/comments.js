import { Router } from 'express';

import CommentController from '../controllers/Comments';

const router = Router();

const { createOne, getPaginated, dispatchResponse } = new CommentController();

router.route('/')
  .post(createOne, dispatchResponse)
  .get(getPaginated, dispatchResponse);

export default router;
