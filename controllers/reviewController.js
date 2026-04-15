import reviewService from "../services/reviewService.js";

class ReviewController {

    async createReview(req, res) {
        const username = req.session.user.username; // Get the username from the session
        const {rental_id, rating, comment} = req.body; // Get the review details from the request body

        try {
            const result = await reviewService.createReview(username, rental_id, rating, comment); // Call the service to create the review
            return res.status(201).json({message: 'Review Created Successfully', result});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}
export default new ReviewController();