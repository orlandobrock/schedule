const { Model, DataTypes } = require("sequelize");

class tb_turmaaluno extends Model {
  static init(sequelize) {
    super.init(
      {
        id_turma: DataTypes.INTEGER,
        id_aluno: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
}

module.exports = tb_turmaaluno;
