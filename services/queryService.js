import queryRepository from "../repositories/queryRepository.js";

class QueryService {

    // Returns the most expensive rental unit for each feature
    async getMostExpensiveByFeature() {
        return await queryRepository.getMostExpensiveByFeature();
    }

    // Returns users who posted two rental units on the same day with feature X and feature Y
    async getUsersWithTwoFeaturesOnSameDay(featureX, featureY) {
        return await queryRepository.getUsersWithTwoFeaturesOnSameDay(featureX, featureY);
    }

    // Returns rental units posted by user X where all reviews are Excellent or Good
    async getRentalUnitsWithGoodReviews(username) {
        return await queryRepository.getRentalUnitsWithGoodReviews(username);
    }

    // Returns users who posted the most rental units on a specific date, including ties
    async getUsersWithMostPostingsOnDate(date) {
        return await queryRepository.getUsersWithMostPostingsOnDate(date);
    }

    // Returns users whose every review is Poor
    async getUsersWhoseAllReviewsArePoor() {
        return await queryRepository.getUsersWhoseAllReviewsArePoor();
    }

    // Returns users whose rental units have never received a Poor review
    async getUsersWithNoPoorReviews() {
        return await queryRepository.getUsersWithNoPoorReviews();
    }
}

export default new QueryService();