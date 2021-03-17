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
            name: 'menuChoices',
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
            console.log(answer.menuChoices)
            switch (answer.menuChoices) {
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
    connection.query('SELECT department.id AS ID, department.name AS Name FROM department;', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    });
};
const viewRoles = () => {
    connection.query('SELECT role.id, role.title, role.salary FROM role;', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    });
};
const viewEmployees = () => {
    connection.query(`SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS Department, 
    role.salary, 
    employee.manager_id 
    FROM role 
    INNER JOIN employee on role.id = employee.role_id 
    INNER JOIN department on department.id = role.dep_id;
    `, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department you would like to add?',
        },
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?',
            {
                name: answer.name,
            },
            (err) => {
                if (err) throw err;
                console.log('This department has been added to our database!');
                menu();
            }
        );
    });
};

const addRole = () => {
    connection.query(`SELECT role.title, role.salary, role.dep_id FROM role`, (err, res) => {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role you would like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            },
            {
                name: 'dep_id',
                type: 'input',
                message: 'What department?',
            },
        ]).then(function (res) {
            connection.query('INSERT INTO role SET ?',
                {
                    title: res.title,
                    salary: res.salary,
                    dep_id: res.dep_id
                },
                (err) => {
                    if (err) throw err;
                    console.log('This role has been added to our database!');
                    menu();
                }
            );
        })
    });
};

const addEmployee = () => {
    connection.query(`SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee`, (err, res) => {
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Please enter this employee\'s first name:',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Please enter this employee\'s last name:',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Please enter this employee\'s role ID:',
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'Please enter this employee\'s manager\'s ID:',
            },
        ]).then(function (res) {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role_id,
                    manager_id: res.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('This employee has been added to our database!');
                    menu();
                }
            );
        });
    });
}
const updateRole = () => {
    const query = connection.query(
        'UPDATE role SET ? WHERE ?',
        [
            {
                quantity: 100,
            },
            {
                flavor: 'Rocky Road',
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} products updated!\n`);
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
};
