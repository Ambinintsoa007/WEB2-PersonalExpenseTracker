import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { authenticateToken} from '../middleware/authMiddleware.js'

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);


export default router;