import { Router } from 'express';

import FilmsController from '../controllers/Films';

const { listFilms, getFilm, dispatchResponse } = new FilmsController();
const router = Router();

router.get('/', listFilms, dispatchResponse);
router.get('/:id', getFilm, dispatchResponse);

export default router;
