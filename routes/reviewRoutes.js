import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Route to create a new review
router.post('/', reviewController.createReview);

export default router;
