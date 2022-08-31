const mysql = require('mysql2');

/**
 * create connection
 * package: https://www.npmjs.com/package/mysql
 */
const db = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});


const checkConnection = () => db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
 
  console.log('MySQL connected');
});

module.exports = {
  db,
  checkConnection,
};