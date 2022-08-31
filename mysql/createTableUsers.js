const { db } = require('./createConnection');

/**
 * @info
 * if you are using a MySQLWorkbench
 * for select example: SELECT * FROM `trevis-exrpess-mysql`.`users`;
 * and on click "yellow lightning like in Harry Potter"
 */

const createTableUsers = () => {
  db.query(
    `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NOT NULL, age INT NOT NULL, PRIMARY KEY (id))`,
    function(err, result, fields) {
      if(!err) {
        console.log("Table 'Users' was created!");
        return;
      } 
  
      if(err) {
        if(err.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log("Table 'Users' already exsist!");
          return;
        }

        console.error(err);
        return;
      }
    })
};

module.exports = createTableUsers;