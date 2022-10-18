const mysql = require('mysql');

// connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER, 
    password        : process.env.DB_PASS, 
    database        : process.env.DB_NAME 
});

// view Users
exports.view=(req, res) => {

 
    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // user the connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err,rows) => {
            // when done with the connection, release it 
            connection.release();
            if(!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);

        });
    });

};


exports.find=(req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        // user the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err,rows) => {
            // when done with the connection, release it 
            connection.release();
            if(!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });

};

//find new user
exports.form=(req, res) => {
res.render('add-user');
};

exports.create=(req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        // user the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments], (err,rows) => {
            // when done with the connection, release it 
            connection.release();
            if(!err) {
                res.render('add-user', { alert: 'User added successfully.'});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
};

exports.edit=(req, res) => {
 res.render('edit-user');
};