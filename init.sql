CREATE DATABASE IF NOT EXISTS warehouse_db;
USE warehouse_db;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','MANAGER') NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE
    );

-- Insert admin only if not already present
INSERT INTO user (username, email, password, role)
VALUES ('admin', 'admin@example.com', '$2a$10$4.AAQp1N5v4YfEZIyuMcoOt0q/Y6OKJIQr4dFDRos1w/.HqILllJq', 'ADMIN');

