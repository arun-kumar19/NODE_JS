const mysql=require('mysql2');
const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'lt_office',
    password:'Arun@12345'
});

module.exports=pool.promise();