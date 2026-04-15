import pool from '../config/db.js';

class RentalUnitRepository {
    async createRentalUnit(username, title, city, state ,price_per_night, description, post_date) {
        const [result] = await pool.query(
            'INSERT INTO rental_units (username, title, city, state, price_per_night, description, post_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, title, city, state, price_per_night, description, post_date]
        );
        return result.insertId; // Return the ID of the newly created rental unit
    }
    async checkDailyLimit(username) {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS count FROM rental_units WHERE username = ? AND DATE(post_date) = CURDATE()',
            [username]
        );
        return rows[0].count < 2; // Return true if the user has posted less than 2 rental units today
    }

    async addFeature(feature_name) {
        const [result] = await pool.query(
            'INSERT IGNORE INTO features (feature_name) VALUES (?)',
            [feature_name]
        );
        return result.insertId; // Return the ID of the newly created feature
    }

    async getFeatureByName(feature_name) {
        const [rows] = await pool.query(
            'SELECT feat_id FROM features WHERE feature_name = ?',
            [feature_name]
        );
        return rows[0] || null; // Return the feature if found, otherwise return null
    }
    async addRentalFeature(rental_id, feat_id) {
        const [result] = await pool.query(
            'INSERT INTO rental_features (rental_id, feat_id) VALUES (?, ?)',
            [rental_id, feat_id]
        );
        return result.insertId; // Return the ID of the newly created rental feature
    }
}

export default new RentalUnitRepository();