const updateProduct = () => {
    console.log('Updating all Rocky Road quantities...\n');
    const query = connection.query(
        'UPDATE products SET ? WHERE ?',
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
// // Post-slack version:
// const updateRole = () => {
//     inquirer.prompt([
//         {
//             name: 'name_of_employee',
//             type: 'input',
//             message: 'Please enter the last name of the employee you would like to edit:',
//         },
//         {
//             name: 'new_role',
//             type: 'input',
//             message: 'Please enter the id of this employee\'s new role:',
//         },
//     ]).then function (res) {connection.query(
//         `SELECT role_id FROM role WHERE answer.role_id`, function (err, res) {


//     .then(function (answer) {
//         connection.query(
//             'UPDATE employee SET role_id=? WHERE last_name=?',
//             [
//                 answer.role_id,
//                 answer.last_name
//             ],
//             function (err, res) {
//                 if (err) throw err;
//                 console.log('This employee\'s information has been updated!');
//                 menu();
//             }
//         );
//     })
// })
// }
// Newer version of updateRole:
const updateRole = () => {
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
    `, function (err, res) {
        if (err) throw err
        inquirer.prompt([
            {
                name: 'last_name',
                type: 'input',
                message: 'Please enter the last name of the employee you would like to edit:',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Please enter the id of this employee\'s new role:',
            },
        ]).then(function (res) {
            connection.query(
                'UPDATE employee SET role_id=? WHERE last_name=?',
                {
                    role_id: res.role_id,
                },
                {
                    last_name: res.last_name,
                },
                function (err) {
                    if (err) throw err;
                    console.log('This employee\'s information has been updated!');
                    menu();
                }
            );
        })
    });
}
// Old version of updateRole:
const updateRole = () => {
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
        inquirer.prompt([
            {
                name: 'role_id',
                type: 'input',
                message: 'Please enter the ID for this employee\'s new role:',
            },
        ]).then(function (res) {
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                {
                    role_id: res.role_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('This employee\'s information has been updated!');
                    menu();
                }
            );
        })
    });
}
// One version of addRole:
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
            connection.query(
                'INSERT INTO role SET ?',
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