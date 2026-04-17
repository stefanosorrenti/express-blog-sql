const mysql = require('mysql2');
const db_data = require('dotenv').config();

const connection  = mysql.createConnection({
    
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

});


connection .connect((err) => {
    if (err) throw err;;
    console.log('Sono connsesso la databse MySQL');
    
});



module.exports = connection 