import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();

const db = await mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     database: process.env.DB_NAME
});

// const db = mysql.createConnection({
//      host: 'localhost',
//      user:'root',
//      password:'mysqlpass',
//      database:'event_management'
// });
console.log("MySQL DB Connected...");

/*
db.connect((err) => {
     if(err){
          console.log(`DB Connection failed ${err}`);
     }
     else{
          console.log(`MySQL DB Connected... `);
     }
});
*/

export default db;