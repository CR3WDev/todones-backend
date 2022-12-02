const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        completedAt: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }
}
module.exports = Task;
