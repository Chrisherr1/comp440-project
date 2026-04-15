import pool from '../config/db.js';

class QueryRepository {

    async getMostExpensiveByFeature() {
        const [rows] = await pool.query(`
            SELECT features.feature_name, rental_units.*
            FROM rental_units
            JOIN rental_features ON rental_units.rental_id = rental_features.rental_id
            JOIN features ON rental_features.feat_id = features.feat_id
            WHERE rental_units.price_per_night = (
                SELECT MAX(r2.price_per_night)
                FROM rental_units r2
                JOIN rental_features rf2 ON r2.rental_id = rf2.rental_id
                WHERE rf2.feat_id = rental_features.feat_id
            )
            GROUP BY features.feature_name, rental_units.rental_id
        `);
        return rows;
    }

    async getUsersWithTwoFeaturesOnSameDay(featureX, featureY) {
        const [rows] = await pool.query(`
            SELECT DISTINCT username
            FROM rental_units outerUnit
            WHERE username IN (
                SELECT rental_units.username
                FROM rental_units
                JOIN rental_features ON rental_units.rental_id = rental_features.rental_id
                JOIN features ON rental_features.feat_id = features.feat_id
                WHERE features.feature_name = ?
                AND DATE(rental_units.post_date) = DATE(outerUnit.post_date)
            )
            AND username IN (
                SELECT rental_units.username
                FROM rental_units
                JOIN rental_features ON rental_units.rental_id = rental_features.rental_id
                JOIN features ON rental_features.feat_id = features.feat_id
                WHERE features.feature_name = ?
                AND DATE(rental_units.post_date) = DATE(outerUnit.post_date)
            )
        `, [featureX, featureY]);
        return rows;
    }

    async getRentalUnitsWithGoodReviews(username) {
        const [rows] = await pool.query(`
            SELECT DISTINCT rental_units.*
            FROM rental_units
            JOIN reviews ON rental_units.rental_id = reviews.rental_id
            WHERE rental_units.username = ?
            AND rental_units.rental_id NOT IN (
                SELECT rental_id FROM reviews
                WHERE rating NOT IN ('Excellent', 'Good')
            )
        `, [username]);
        return rows;
    }

    async getUsersWithMostPostingsOnDate(date) {
        const [rows] = await pool.query(`
            SELECT username, COUNT(*) as total
            FROM rental_units
            WHERE DATE(post_date) = ?
            GROUP BY username
            HAVING total = (
                SELECT MAX(cnt) FROM (
                    SELECT COUNT(*) as cnt
                    FROM rental_units
                    WHERE DATE(post_date) = ?
                    GROUP BY username
                ) as counts
            )
        `, [date, date]);
        return rows;
    }

    async getUsersWhoseAllReviewsArePoor() {
        const [rows] = await pool.query(`
            SELECT DISTINCT username
            FROM reviews
            WHERE username NOT IN (
                SELECT username FROM reviews
                WHERE rating != 'Poor'
            )
        `);
        return rows;
    }

    async getUsersWithNoPoorReviews() {
        const [rows] = await pool.query(`
            SELECT DISTINCT username
            FROM rental_units
            WHERE username NOT IN (
                SELECT DISTINCT rental_units.username
                FROM rental_units
                JOIN reviews ON rental_units.rental_id = reviews.rental_id
                WHERE reviews.rating = 'Poor'
            )
        `);
        return rows;
    }
}

export default new QueryRepository();