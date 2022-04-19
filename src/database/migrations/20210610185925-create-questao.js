"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_questao", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_atividade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: { model: "tb_atividade", key: "id" },
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
      nu_acertos: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_questao");
  },
};
