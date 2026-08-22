import express from 'express';
import { getLeetCodeStats } from '../controllers/leetcodeController.js';

const router = express.Router();

// GET /api/leetcode/:username
router.get('/:username', getLeetCodeStats);

export default router;