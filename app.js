const mysql = require('mysql');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rnick1$9A!',
    database: 'employeeDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    menu();
});

const menu = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu choices',
            message: 'What would you like to do?',
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'View department',
                'View role',
                'View employee',
                'Update role'
            ],
        }])
        .then((answer) => {
            switch (answer.action) {
                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'View department':
                    viewDepartments();
                    break;

                case 'View role':
                    viewRoles();
                    break;

                case 'View employee':
                    viewEmployees();
                    break;

                case 'Update role':
                    updateRole();
                    break;
            };
        });

const viewDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT department.id, department.name FROM department;', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};
const viewRoles = () => {
    console.log('Selecting all roles...\n');
    connection.query('SELECT role.id, role.title, role.salary FROM role;', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
    console.log(query.sql);
};
// Important!!! I still need to add department name to this result!!! I need to figure out how to join three or more tables...
const viewEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM role INNER JOIN employee on role.id = employee.role_id;', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department you would like to add?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.name,
                },
                (err) => {
                    if (err) throw err;
                    console.log('This department has been added to our database!');
                    start();
                }
            );
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role you would like to add?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?',
            },
            {
                name: 'department',
                type: 'input',
                message: 'What department does the role belong to?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department: answer.department,
                },
                (err) => {
                    if (err) throw err;
                    console.log('This role has been added to our database!');
                    start();
                }
            );
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'employee_first_name',
                type: 'input',
                message: 'What is the employee\'s first name?',
            },
            {
                name: 'employee_last_name',
                type: 'input',
                message: 'What is the employee\'s last name?',
            },
            {
                name: 'employee_role',
                type: 'input',
                message: 'What role does the employee have in the company?',
            },
            // Maybe replace the manager question with a dropdown...
            {
                name: 'employee_manager',
                type: 'input',
                message: 'Who is this employee\'s manager?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.employee_first_name,
                    last_name: answer.employee_last_name,
                    employee_role: answer.employee_role,
                    employee_manager: answer.employee_manager || null,
                },
                (err) => {
                    if (err) throw err;
                    console.log('This employee has been added to our database!');
                    start();
                }
            );
        });
};
// Ask first name, last name, assign a role, and select a manager's id (possibly from a dropdown???)
// function updateRole(); Needs a lot of work...
const updateRole = () => {
    inquirer
        .prompt([
            {
                name: 'employee_last_name',
                type: 'input',
                message: 'What is the employee\'s last name?',
            },
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.bid,
                    },
                    {
                        id: chosenItem.id,
                    },
                ],
                (error) => {
                    if (error) throw err;
                    console.log('Bid placed successfully!');
                    start();
                }
            )]
        )
}