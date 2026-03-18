import session from 'express-session';

// MySQL session store to persist session data in the MySQL database,
// Basically creates a table in the MySQL database to store session data, 
// allowing sessions to persist across server restarts and be shared across multiple server instances,

import MySQLStore from 'express-mysql-session';
import pool from '../config/db.js';

// Session store configuration using MySQL
const sessionStore = new MySQLStore({}, pool);

// Session middleware
export default function sessionMiddleware() {
        return session({
        secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie, should be stored securely in environment variables
        store: sessionStore,
        resave : false,             // Prevents session from being saved back to the session store if it wasn't modified during the request
        saveUninitialized : false,  // Prevents uninitialized sessions from being saved to the session store
        cookie: {
            secure: false,          // Ensures cookies are only sent over HTTPS in production
            httpOnly: true,         // Prevents client-side JavaScript from accessing the session cookie, enhancing security against XSS attacks
            maxAge: 1000 * 60 * 60 * 24 // Sets the session cookie to expire after 24 hours
        }
    });
}
