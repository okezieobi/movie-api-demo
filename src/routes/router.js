import { Router } from 'express';

import filmsRouter from './films';
import peopleRouter from './people';

const router = Router();

router.use('/films', filmsRouter);
router.use('/people', peopleRouter);

export default router;
