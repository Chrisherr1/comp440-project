import express from 'express';
import queryController from '../controllers/queryController.js';

const router = express.Router();

// Route for Query 1: Get the most expensive rental unit for each feature
router.get('/most-expensive-by-feature', queryController.getMostExpensiveByFeature);

// Route for Query 2: Get users who posted two rental units on the same day with feature X and feature Y
router.get('/two-features-same-day', queryController.getUsersWithTwoFeaturesOnSameDay);

// Route for Query 3: Get rental units posted by user X where all reviews are Excellent or Good
router.get('/good-reviews', queryController.getRentalUnitsWithGoodReviews);

// Route for Query 4: Get users who posted the most rental units on a specific date, including ties
router.get('/most-postings-on-date', queryController.getUsersWithMostPostingsOnDate);

// Route for Query 5: Get users whose every review is Poor
router.get('/all-poor-reviews', queryController.getUsersWhoseAllReviewsArePoor);

// Route for Query 6: Get users whose rental units have never received a Poor review
router.get('/no-poor-reviews', queryController.getUsersWithNoPoorReviews);

export default router;