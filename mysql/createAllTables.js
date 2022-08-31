const createTableUsers = require('./createTableUsers');

const createAllTables = () => {
  createTableUsers();
};

module.exports = createAllTables;