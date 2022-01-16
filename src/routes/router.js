import { Router } from 'express';

import filmsRouter from './films';

const router = Router();

router.use('/films', filmsRouter);

export default router;
