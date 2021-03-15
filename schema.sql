DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- Department table:
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);
-- Role table:
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (7, 2) NOT NULL,
    dep_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dep_id) REFERENCES department(id)
);
-- Employee table:
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- For viewEmployees:
-- SELECT employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM role INNER JOIN employee on role.id = employee.role_id;

-- For viewRoles: 
-- SELECT role.id, role.title, role.salary FROM role;
