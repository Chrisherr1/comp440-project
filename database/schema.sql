CREATE DATABASE IF NOT EXISTS comp440;
USE comp440;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE
);

CREATE TABLE IF NOT EXISTS rental_units (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10,2) NOT NULL,
    post_date DATETIME NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS features (
    feat_id INT AUTO_INCREMENT PRIMARY KEY,
    feature_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS rental_features (
    rental_id INT NOT NULL,
    feat_id INT NOT NULL,
    PRIMARY KEY (rental_id, feat_id),
    FOREIGN KEY (rental_id) REFERENCES rental_units(rental_id),
    FOREIGN KEY (feat_id) REFERENCES features(feat_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    username VARCHAR(50) NOT NULL,
    rental_id INT NOT NULL,
    rating ENUM('Excellent', 'Good', 'Fair', 'Poor') NOT NULL,
    comment TEXT,
    post_date DATETIME NOT NULL,
    PRIMARY KEY (username, rental_id),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (rental_id) REFERENCES rental_units(rental_id)
);