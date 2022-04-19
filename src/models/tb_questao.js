const { Model, DataTypes } = require("sequelize");

class tb_questao extends Model {
  static init(sequelize) {
    super.init(
      {
        id_atividade: DataTypes.INTEGER,
        enunciado: DataTypes.STRING,
        resp1: DataTypes.STRING,
        resp2: DataTypes.STRING,
        resp3: DataTypes.STRING,
        resp4: DataTypes.STRING,
        respcerta: DataTypes.STRING,
        nu_acertos: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.tb_atividade, {
      foreignKey: "id_atividade",
      as: "atividade",
    });
  }
}

module.exports = tb_questao;
