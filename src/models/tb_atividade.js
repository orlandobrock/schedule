const { Model, DataTypes } = require("sequelize");

class tb_atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_atividade: DataTypes.STRING,
        nu_acertos: DataTypes.INTEGER,
        id_turma: DataTypes.INTEGER,
        is_ativa: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.tb_turma, {
      foreignKey: "id_turma",
      as: "turmas",
    });
    this.belongsToMany(models.tb_usuario, {
      through: "tb_atividadealuno",
      foreignKey: "id_aluno",
      as: "atividade",
    });
  }
}

module.exports = tb_atividade;
