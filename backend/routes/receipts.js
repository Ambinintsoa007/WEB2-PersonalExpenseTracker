import express from 'express';
import { getReceipt } from '../controllers/receiptsController.js';

const router = express.Router();
router.get('/:expenseId', getReceipt);

export default router;
