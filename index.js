require('dotenv').config();
const express = require('express');
const { db, checkConnection } = require('./mysql/createConnection');
const createAllTables = require('./mysql/createAllTables');

// =============
/**
 * @info
 * note
 * package "mysql" - doesn't work, because error with protocol
 * insted of mysql, you can use a mysql2, 
 */
// =============
/**
 * @info
 * oficial docs: https://www.npmjs.com/package/mysql2
 * first variant connect (variant from docs: https://www.npmjs.com/package/mysql2)
 * more correct is in mysql folder
 */
/*
const db = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
 
  console.log('MySQL connected');
});

db.query(
  `CREATE TABLE users (ID int NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID), name varchar(255), age int)`,
  function(err, result, fields) {
    console.log("result", result); // results contains rows returned by server
    console.log("fields", fields); // fields contains extra meta data about results, if available
  }
); */
// =============

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Hello, this is Express-mysql'))

// Requests to DB on Promises =============
const dbPromise = require('./mysql/createConnectionPromies');

app.get('/users/promise', async (req, res) => {
  const connectDbPromises = await dbPromise();
  const [rows, fields] = await connectDbPromises.execute("SELECT * FROM users");
  res.send(rows);
})
app.post('/users/promise', async (req, res) => {
  const { name, age } = req.body;

  const connectDbPromises = await dbPromise();
  const [rows, fields] = await connectDbPromises.execute(`INSERT INTO users (name, age) VALUES ('${name}', ${age})`,);
  res.send('User added success!');
})

// Requests to DB without Promises =============
app.get('/users', async (req, res) => {
  /**
   * first variant
   */
  db.query(
    `SELECT * FROM users`,
    function(err, results, fields) {
      if(!err) {
        res.send(results);
      } else {
        console.error(err);
        res.send('Smth went wrong');
      }
    }
  );
})

app.post('/users', (req, res) => {
  const { name, age } = req.body;

  db.query(
    `INSERT INTO users (name, age) VALUES ('${name}', ${age})`,
    function(err, results, fields) {
      if(!err) {
        res.send('User added success!');
      } else {
        console.error(err);
        res.send('Smth went wrong');
      }
    }
  );
  
})
// =============
app.listen('8080', async () => {
  console.log('Server started on port 8080');

  checkConnection(); // create connection to MySql db
  createAllTables(); // create all tables if they doesn't exsist
})