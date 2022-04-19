const { Model, DataTypes } = require("sequelize");

class tb_atividadealuno extends Model {
  static init(sequelize) {
    super.init(
      {
        id_atividade: DataTypes.INTEGER,
        id_aluno: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
}

module.exports = tb_atividadealuno;
