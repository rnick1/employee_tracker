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
// // Now I need one function for each choice that the user has:
// function addDepartment();
// // We want inquirer to ask the name of the department, the user types an input response and hits enter. A message is then console.logged saying that the department has been added. The department id will be added automatically.
// function addRole();
// // We want inquirer to ask what the title for the role is, it's salary, and the department that it belongs to. It will also have an id automatically assigned.

const addEmployee = () => {
    // prompt for info about the item being put up for auction
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
                'INSERT INTO emmployee SET ?',
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
const viewDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};
const viewRoles = () => {
    console.log('Selecting all roles...\n');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
    console.log(query.sql);
};
const viewEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};
// function updateRole();


