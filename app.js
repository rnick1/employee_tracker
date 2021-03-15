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
                name: 'item',
                type: 'input',
                message: 'What is the item you would like to submit?',
            },
            {
                name: 'category',
                type: 'input',
                message: 'What category would you like to place your auction in?',
            },
            {
                name: 'startingBid',
                type: 'input',
                message: 'What would you like your starting bid to be?',
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                'INSERT INTO auctions SET ?',
                // QUESTION: What does the || 0 do?
                {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid || 0,
                    highest_bid: answer.startingBid || 0,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your auction was created successfully!');
                    // re-prompt the user for if they want to bid or post
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


