const { Model, DataTypes } = require("sequelize");

class tb_usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_usuario: DataTypes.STRING,
        senha: DataTypes.STRING,
        dt_nascimento: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        biografia: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.tb_cargo, { foreignKey: "id_cargo", as: "cargo" });
    this.belongsToMany(models.tb_turma, {
      through: "tb_turmaaluno",
      foreignKey: "id_aluno",
      as: "turma",
    });
    this.belongsToMany(models.tb_atividade, {
      through: "tb_atividadealuno",
      foreignKey: "id_atividade",
      as: "aluno",
    });
  }
}

module.exports = tb_usuario;
