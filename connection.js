const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
     port: process.env.DB_PORT,
     host: process.env.DB_HOST,
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     ssl: {
          rejectUnauthorized: false
     },
     flags: 'allowPublicKeyRetrieval=true'
});

connection.connect((err) => {
     if (!err){
          console.log("database is succesffuly connected !");
     }else{
          console.log("failed connected database : "+err);
     }
});

module.exports = connection;