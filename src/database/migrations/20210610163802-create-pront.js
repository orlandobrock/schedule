"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_questpront", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_disc: {
        type: Sequelize.STRING(3),
        references: { model: "tb_disciplina", key: "id" },
        allowNull: false,
      },
      enunciado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resp1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resp2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resp3: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resp4: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      respcerta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_questpront");
  },
};
