const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Task = require("../models/task.model");
const connection = new Sequelize(dbConfig);

const test_connection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

Task.init(connection);
// test_connection();
module.exports = connection;
