import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, userSchema } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['ADMIN']), getAllUsers);
router.post('/', authorize(['ADMIN']), validate(userSchema), createUser);
router.get('/:id', authorize(['ADMIN', 'ANALYST']), getUserById);
router.put('/:id', authorize(['ADMIN']), validate(userSchema.partial()), updateUser);
router.delete('/:id', authorize(['ADMIN']), deleteUser);

export default router;
