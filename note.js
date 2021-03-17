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