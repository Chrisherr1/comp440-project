import express from 'express';
import PageController from '../controllers/pageController.js'

const router = express.Router();

function requireAuth(req, res, next) {
    if (req.session.user) return next();
    return res.redirect('/');
}

// Route for Home Page
router.get('/home', PageController.getHomePage);

// Route for Login Page
router.get('/', PageController.getLoginPage);

// Route for Register Page
router.get('/register', PageController.getRegisterPage);

// Route for Post Rental Page (protected)
router.get('/post-rental', requireAuth, PageController.getPostRentalPage);

// Route for Search Page (public)
router.get('/search', PageController.getSearchPage);

// Route for Write Review Page (protected)
router.get('/write-review', requireAuth, PageController.getWriteReviewPage);

// Route for Queries Page (protected)
router.get('/queries', requireAuth, PageController.getQueriesPage);

export default router;