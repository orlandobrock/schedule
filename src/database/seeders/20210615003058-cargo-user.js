"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tb_cargo",
      [
        {
          nm_cargo: "Professor",
        },
        {
          nm_cargo: "Estudante",
        },
        {
          nm_cargo: "Admin",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tb_cargo", null, {});
  },
};
