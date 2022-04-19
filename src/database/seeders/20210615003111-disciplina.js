"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tb_disciplina",
      [
        {
          id: "GEO",
          nm_disciplina: "Geografia",
        },
        {
          id: "INF",
          nm_disciplina: "Informatica",
        },
        {
          id: "MAT",
          nm_disciplina: "Matematica",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tb_disciplina", null, {});
  },
};
