USE employeeDB;
-- Seed data for departments table:
INSERT INTO department (name, id)
VALUES ('Finance', 1), ('HR', 2), ('Sales', 3);

USE employeeDB;
-- Seed data for role table:
INSERT INTO role (id, title, salary, dep_id)
VALUES (1, 'Junior Manager', 40000.00, 3), (2, 'Manager', 47000.00, 1), (3, 'Senior Manager', 52000.00, 2);

USE employeeDB;
-- Seed data for employee table:
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Phil', 'Smetona', 2, 2), (2, 'Harriet', 'Johnson', 3, null), (3, 'Arnold', 'Srikar', 1, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
