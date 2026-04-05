import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate, userSchema } from '../middleware/validation';

const router = Router();

router.post('/register', validate(userSchema.omit({ role: true, status: true })), register);
router.post('/login', validate(userSchema.pick({ email: true, password: true })), login);

export default router;
