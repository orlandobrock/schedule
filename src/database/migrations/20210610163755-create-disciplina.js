"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_disciplina", {
      id: {
        type: Sequelize.STRING(3),
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
      },
      nm_disciplina: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_disciplina");
  },
};
