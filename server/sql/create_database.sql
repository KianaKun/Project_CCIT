CREATE DATABASE IF NOT EXISTS rumah_sakit;

USE rumah_sakit;

CREATE TABLE IF NOT EXISTS form (
    idform INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    gender ENUM('laki-laki', 'perempuan'),
    phone VARCHAR(20),
    birthdate DATE,
    address VARCHAR(255),
    email VARCHAR(100),
    complain TEXT,
    meetingDate DATETIME,
    nama_dokter VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS admins(
    id VARCHAR(100) PRIMARY KEY,
    passwords VARCHAR(100),
    statusLogin BOOLEAN
);

INSERT INTO admins (id, passwords, statusLogin) VALUES ('admin', 'admin', true);