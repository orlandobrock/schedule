"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_turmaaluno", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_turma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model: "tb_turma", key: "id" },
      },
      id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model: "tb_usuario", key: "id" },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_turmaaluno");
  },
};
