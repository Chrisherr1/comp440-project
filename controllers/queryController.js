import queryService from "../services/queryService.js";

class QueryController {

    // GET /api/v1/queries/most-expensive-by-feature
    // Returns the most expensive rental unit for each feature
    async getMostExpensiveByFeature(req, res) {
        try {
            const results = await queryService.getMostExpensiveByFeature();
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // GET /api/v1/queries/two-features-same-day?featureX=Wifi&featureY=Pool
    // Returns users who posted two rental units on the same day with feature X and feature Y
    async getUsersWithTwoFeaturesOnSameDay(req, res) {
        const { featureX, featureY } = req.query;
        try {
            const results = await queryService.getUsersWithTwoFeaturesOnSameDay(featureX, featureY);
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // GET /api/v1/queries/good-reviews?username=john
    // Returns rental units posted by user X where all reviews are Excellent or Good
    async getRentalUnitsWithGoodReviews(req, res) {
        const { username } = req.query;
        try {
            const results = await queryService.getRentalUnitsWithGoodReviews(username);
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // GET /api/v1/queries/most-postings-on-date?date=2026-04-15
    // Returns users who posted the most rental units on a specific date, including ties
    async getUsersWithMostPostingsOnDate(req, res) {
        const { date } = req.query;
        try {
            const results = await queryService.getUsersWithMostPostingsOnDate(date);
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // GET /api/v1/queries/all-poor-reviews
    // Returns users whose every review is Poor
    async getUsersWhoseAllReviewsArePoor(req, res) {
        try {
            const results = await queryService.getUsersWhoseAllReviewsArePoor();
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // GET /api/v1/queries/no-poor-reviews
    // Returns users whose rental units have never received a Poor review
    async getUsersWithNoPoorReviews(req, res) {
        try {
            const results = await queryService.getUsersWithNoPoorReviews();
            return res.status(200).json({ results });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new QueryController();