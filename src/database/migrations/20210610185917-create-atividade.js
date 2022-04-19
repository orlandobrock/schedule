"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_atividade", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nm_atividade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nu_acertos: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      id_turma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tb_turma", key: "id" },
      },
      is_ativa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_atividade");
  },
};
