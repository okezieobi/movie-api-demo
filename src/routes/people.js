import { Router } from 'express';

import PeopleController from '../controllers/People';

const router = Router();
const { listPeople, searchPeople, dispatchResponse } = new PeopleController();

router.get('/all', listPeople, dispatchResponse);
router.get('/filtered', searchPeople, dispatchResponse);

export default router;
