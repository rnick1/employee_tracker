DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
depName VARCHAR (30),
PRIMARY KEY (id)
);

CREATE TABLE empRole (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL (7, 2) NOT NULL,
depID INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
roleID INT NOT NULL,
manID INT NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM empRole;
SELECT * FROM employee;

-- I need to join department.id with role.depID so that role.depID = department.id
-- I need to join role.id with with employee.roleID so that role.id = employee.roleID
-- When prompted, if the name the user adds as an empoyee's manager, then that manager's employee.id needs to be joined with the employee's employee.manID so that employee.manID = employee.ID (of the manager)
SELECT id, title, salary
FROM department
INNER JOIN role ON department.id = role.depID;