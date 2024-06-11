const mysql =require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'rumah_sakit'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connection successfully established');
    
    // Example query to fetch data from a table
    connection.query('SELECT * FROM form', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return;
        }
        console.log('Data from database:', results);
        // Now you can use the 'results' variable to access the data retrieved from the database
    });
});

module.exports=connection;