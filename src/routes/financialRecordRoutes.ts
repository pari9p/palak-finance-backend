import { Router } from 'express';
import {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/financialRecordController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, financialRecordSchema } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN', 'ANALYST', 'VIEWER']), getAllRecords);
router.post('/', authorize(['ADMIN', 'ANALYST']), validate(financialRecordSchema), createRecord);
router.get('/:id', authorize(['ADMIN', 'ANALYST', 'VIEWER']), getRecordById);
router.put('/:id', authorize(['ADMIN', 'ANALYST']), validate(financialRecordSchema.partial()), updateRecord);
router.delete('/:id', authorize(['ADMIN']), deleteRecord);

export default router;
