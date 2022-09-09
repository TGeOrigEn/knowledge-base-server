import Activity from '../controllers/activity';
import { Router } from 'express';

const router = Router();

router.post('/activity', Activity.create);

router.get('/activity', Activity.getAll);

router.put('/activity', Activity.update);

router.delete('/activity/:id', Activity.delete);

export default router;