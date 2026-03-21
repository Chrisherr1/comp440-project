import express from 'express';
import PageController from '../controllers/pageController.js'

const router = express.Router();

// Route for Home Page
router.get('/home', PageController.getHomePage);

// Route for Login Page
router.get('/', PageController.getLoginPage);

// Route for Register Page
router.get('/register',PageController.getRegisterPage);

export default router;