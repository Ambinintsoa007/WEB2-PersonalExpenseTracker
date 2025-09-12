import express from 'express';
import { getMonthlySummary, getSummaryByRange, getAlerts } from '../controllers/summaryController.js';

const router = express.Router();
router.get('/monthly', getMonthlySummary);
router.get('/', getSummaryByRange);
router.get('/alerts', getAlerts);

export default router;
