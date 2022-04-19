"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_atividadealuno", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_atividade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model: "tb_atividade", key: "id" },
      },
      id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model: "tb_usuario", key: "id" },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_atividadealuno");
  },
};
