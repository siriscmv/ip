CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE  NOT NULL,
    gender VARCHAR(1) NOT NULL,
    about VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sessions (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);