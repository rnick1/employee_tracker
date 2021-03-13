const mysql = require('mysql');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'boston',
});

const readColleges = () => {
    connection.query('SELECT name FROM colleges', (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    readColleges();
});
