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