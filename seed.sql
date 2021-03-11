-- Seed data for departments table:
INSERT INTO departments (depName)
VALUES ('Finance');

INSERT INTO departments (depName)
VALUES ('HR');

INSERT INTO departments (depName)
VALUES ('Sales');

-- Seed data for role table:
INSERT INTO role (title, salary)
VALUES ('accountant', 45000.00);

INSERT INTO role (title, salary)
VALUES ('Assistant HR', 47000.00);

INSERT INTO role (title, salary)
VALUES ('Sales Manager', 41000.00);

-- Seed data for employee table:
INSERT INTO employee (first_name, last_name)
VALUES ('Phil', 'Smetona');

INSERT INTO employee (first_name, last_name)
VALUES ('Harriet', 'Johnson');

INSERT INTO employee (first_name, last_name)
VALUES ('Arnold', 'Srikar');
