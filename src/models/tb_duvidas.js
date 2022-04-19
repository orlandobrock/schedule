const { Model, DataTypes } = require("sequelize");

class tb_duvida extends Model {
  static init(sequelize) {
    super.init(
      {
        duvida: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.tb_questao, {
      foreignKey: "id_questao",
      as: "questao",
    });
  }
}

module.exports = tb_duvida;
