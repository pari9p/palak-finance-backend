import { Router } from 'express';
import { getSummary } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/summary', authorize(['ADMIN', 'ANALYST', 'VIEWER']), getSummary);

export default router;
