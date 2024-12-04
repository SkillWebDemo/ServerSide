CREATE DATABASE nodejs_rest_api;
USE nodejs_rest_api;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);



INSERT INTO users (name, email)
VALUES ("Lucifer Morningstar", "devil@he.ll");