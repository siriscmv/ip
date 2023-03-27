CREATE TABLE patient_details (
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    ID INT,
    gender VARCHAR(1) NOT NULL,
    address VARCHAR(255) NOT NULL,
    marital_status BOOLEAN NOT NULL,
    date_of_visit DATE NOT NULL,
    disease_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID)
);