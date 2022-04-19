"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_usuario", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nm_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      biografia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_cargo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tb_cargo", key: "id" },
        defaultValue: 1,
      },
      foto: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_usuario");
  },
};
