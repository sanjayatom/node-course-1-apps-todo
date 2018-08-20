const mysql = require('mysql');

var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'nodejs_user',
    // password: 'sanJAN15',
    // database: 'db_mvc_template'

    host: 'eow.c8f18afkuibk.us-west-2.rds.amazonaws.com',
    user: 'root',
    password: 'mysql123',
    database: 'eproctor'
});

connection.connect((err) => {
    if(err){
        return console.log('Unable to connect mysql server', err);
    }
    console.log('Connected to mysql server');
});

connection.query('call ussp_test(?,?,?)', [null,null,null], (error, results, fields) => {
    if(error){
        return console.log('Error in executing query: ', error);
    }
    console.log(JSON.stringify(results, undefined, 2));
    // console.log(JSON.stringify(fields, undefined, 2));
});

// connection.query('select * from user_vt', (error, results, fields) => {
//     if(error){
//         console.log('Error in executing query: ', error);
//     }
//     console.log(JSON.stringify(results[0], undefined, 2));
//     console.log(JSON.stringify(fields, undefined, 2));
// });

connection.end((err) => {
    console.log('Connection Closed.');
});
