USE employeeDB;
-- Seed data for departments table:
INSERT INTO department (name, id)
VALUES ('Finance', 1), ('HR', 2), ('Sales', 3);

USE employeeDB;
-- Seed data for role table:
INSERT INTO role (title, salary, id)
VALUES ('Junior Manager', 40000.00, 1), ('Manager', 47000.00, 2), ('Senior Manager', 52000.00, 3);

USE employeeDB;
-- Seed data for employee table:
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Phil', 'Smetona', 2, 2), (2, 'Harriet', 'Johnson', 3, null), (3, 'Arnold', 'Srikar', 1, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- I need to join department.id with role.depID so that role.depID = department.id
-- I need to join role.id with with employee.roleID so that role.id = employee.roleID
-- When prompted, if the name the user adds as an empoyee's manager, then that manager's employee.id needs to be joined with the employee's employee.manID so that employee.manID = employee.ID (of the manager)
-- SELECT id, title, salary
-- FROM department
-- INNER JOIN role ON department.id = role.depID;