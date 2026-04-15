import express from 'express';
import rentalUnitController from '../controllers/rentalUnitController.js';

const router = express.Router();

// Route to create a new rental unit
router.post('/', rentalUnitController.createRentalUnit);

// Route to search for rental units by features
router.get('/search', rentalUnitController.searchByFeature);

export default router;