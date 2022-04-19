const { Model, DataTypes } = require("sequelize");

class tb_turma extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_turma: DataTypes.STRING,
        id_professor: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.tb_usuario, {
      through: "tb_turmaaluno",
      as: "aluno",
      foreignKey: "id_turma",
    });
  }
}

module.exports = tb_turma;
