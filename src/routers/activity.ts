import Activity from '../controllers/activity';
import { Router } from 'express';

const router = Router();

router.post('/activity', Activity.insert);

router.get('/activity/all', Activity.selectAll);

router.get('/activity', Activity.selectBy);

router.put('/activity/:id', Activity.update);

router.delete('/activity/:id', Activity.delete);

export default router;