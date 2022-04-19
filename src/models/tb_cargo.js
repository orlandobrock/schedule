const { Model, DataTypes } = require("sequelize");

class tb_cargo extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_cargo: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
}

module.exports = tb_cargo;
