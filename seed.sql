USE employeeDB;
-- Seed data for departments table:
INSERT INTO department (name)
VALUES ('Finance'), ('HR'), ('Sales');

USE employeeDB;
-- Seed data for role table:
INSERT INTO role (title, salary, dep_id)
VALUES ('Junior Manager', 40000.00, 3), ('Manager', 47000.00, 1), ('Senior Manager', 52000.00, 2);

USE employeeDB;
-- Seed data for employee table:
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Phil', 'Smetona', 2, 2), ('Harriet', 'Johnson', 3, null), ('Arnold', 'Srikar', 1, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
