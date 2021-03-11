USE employeeDB;
-- Seed data for departments table:
INSERT INTO departments (depName)
VALUES ('Finance');

INSERT INTO departments (depName)
VALUES ('HR');

INSERT INTO departments (depName)
VALUES ('Sales');

-- Seed data for role table:
INSERT INTO role (title, salary)
VALUES ('Junior Manager', 40000.00);

INSERT INTO role (title, salary)
VALUES ('Manager', 47000.00);

INSERT INTO role (title, salary)
VALUES ('Senior Manager', 52000.00);

-- Seed data for employee table:
INSERT INTO employee (first_name, last_name)
VALUES ('Phil', 'Smetona');

INSERT INTO employee (first_name, last_name)
VALUES ('Harriet', 'Johnson');

INSERT INTO employee (first_name, last_name)
VALUES ('Arnold', 'Srikar');
