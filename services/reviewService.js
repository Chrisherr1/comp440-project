import reviewRepository from "../repositories/reviewRepository.js";

class ReviewService {

    async createReview(username, rental_id, rating, comment) {
        // Check if the user is the owner of the rental unit
        const isOwner = await reviewRepository.checkIfOwner(username, rental_id);
        if (isOwner) {
            throw new Error('Owners cannot review their own rental units');
        }

        // Check if the user has already reviewed this rental unit
        const hasReviewed = await reviewRepository.checkExistingReview(username, rental_id);
        if (hasReviewed) {
            throw new Error('You have already reviewed this rental unit');
        }

        // Check if the user has reached the daily limit of 3 reviews
        const canPost = await reviewRepository.checkDailyLimit(username);
        if (!canPost) {
            throw new Error('Daily limit of 3 reviews reached');
        }

        // Create the review
        const result = await reviewRepository.createReview(username, rental_id, rating, comment);
        return result;
    }
}
export default new ReviewService();