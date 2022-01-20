import { Router } from 'express';

import filmsRouter from './films';
import peopleRouter from './people';
import commentRouter from './comments';

const router = Router();

router.use('/films', filmsRouter);
router.use('/people', peopleRouter);
router.use('/comments', commentRouter);

export default router;
