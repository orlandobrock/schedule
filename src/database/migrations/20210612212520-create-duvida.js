"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_duvida", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_questao: {
        type: Sequelize.INTEGER,
        refereces: { model: "tb_questao", key: "id" },
        allowNull: false,
      },
      duvida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_duvida");
  },
};
