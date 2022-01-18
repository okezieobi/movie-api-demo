import { Router } from 'express';

import PeopleController from '../controllers/People';

const router = Router();
const { listPeople, dispatchResponse } = new PeopleController();

router.get('/', listPeople, dispatchResponse);

export default router;
