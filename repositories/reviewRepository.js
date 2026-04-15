import pool from '../config/db.js';

class ReviewRepository {

    async checkIfOwner(username, rental_id) {
        const [rows] = await pool.query(
            'SELECT username FROM rental_units WHERE username = ? AND rental_id = ?',
            [username, rental_id]
        );
        return rows.length > 0;
    }

    async checkExistingReview(username, rental_id) {
        const [rows] = await pool.query(
            'SELECT username FROM reviews WHERE username = ? AND rental_id = ?',
            [username, rental_id]
        );
        return rows.length > 0;
    }

    async checkDailyLimit(username) {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS count FROM reviews WHERE username = ? AND DATE(post_date) = CURDATE()',
            [username]
        );
        return rows[0].count < 3;
    }

    async createReview(username, rental_id, rating, comment) {
        const [result] = await pool.query(
            'INSERT INTO reviews (username, rental_id, rating, comment, post_date) VALUES (?, ?, ?, ?, NOW())',
            [username, rental_id, rating, comment]
        );
        return result.affectedRows;
    }
}

export default new ReviewRepository();