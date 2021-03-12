DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- Department table:
CREATE TABLE department (
id INT AUTO_INCREMENT,
name VARCHAR (30),
PRIMARY KEY (id)
);
-- Role table:
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL (7, 2) NOT NULL,
dep_id INT,
PRIMARY KEY (id),
FOREIGN KEY (dep_id) REFERENCES department (id)
);
-- Employee table:
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL DEFAULT 0,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role (id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);
