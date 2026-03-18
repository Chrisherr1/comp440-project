import pool from '../config/db.js';

// NOTE for myself: ? is used to prevent SQL injection it's built into the mysql2 import
// allows us to use ? instead of acutally passing the value in
// `SELECT * FROM user WHERE username = '${username}'` is dangerous because someone could send our backend sql and changing the logic.

// Note for self: talks to database, raw sql queries
class UserRepository {

    //finds the user by username
    async findByUsername (username){
        const [rows] = await pool.query(
        'SELECT * FROM user WHERE username = ?',[username]
        );
        return rows[0] || null;
    }

    //find user by email
    async findByEmail (email){
        const[rows] = await pool.query(
        'SELECT * FROM user WHERE email = ?',[email]
        );
        return rows[0] || null;
    }
    
    //find user by phone
    async findByPhone(phone) {
        const[rows] = await pool.query(
        'SELECT * FROM user WHERE phone = ?',[phone]
        );
        return rows[0] || null;
    }

    //insert new user into database
    async createUser(username,password,firstName,lastName,email,phone){
        const [result] = await pool.query(
        'INSERT INTO user (username,password,firstName,lastName,email,phone) values (?,?,?,?,?,?)',[username,password,firstName,lastName,email,phone]
        );
        //result.affectedRows shows what was affected and is built into mysql2 import
        //used after INSERT,UPDATE,DELETE
        return result.affectedRows;
    }
}


export default new UserRepository();

// next step would be UserDTO.js