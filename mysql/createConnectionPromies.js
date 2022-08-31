const mysqlPromise = require('mysql2/promise');

/**
 * create connection on Promises
 * package: https://www.npmjs.com/package/mysql
 * title on the page of package: "Using Promise Wrapper"
 */
const dbPromise = async () => await mysqlPromise.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});

module.exports = dbPromise;
