import { Router } from 'express';

import CommentController from '../controllers/Comments';

const router = Router();

const { createOne, dispatchResponse } = new CommentController();

router.route('/')
  .post(createOne, dispatchResponse);

export default router;
