const Sequelize = require("sequelize");
const dbconfig = require("../config/database");

const Usuario = require("../models/tb_usuario");
const Cargo = require("../models/tb_cargo");
const Turma = require("../models/tb_turma");
const Questao = require("../models/tb_questao");
const Atividade = require("../models/tb_atividade");
const Duvida = require("../models/tb_duvidas");
const TurmaAluno = require("../models/tb_turmaaluno");
const AtividadeAluno = require("../models/tb_atividadealuno");
const connection = new Sequelize(dbconfig);

Usuario.init(connection);
Cargo.init(connection);
Turma.init(connection);
Questao.init(connection);
Atividade.init(connection);
Duvida.init(connection);
TurmaAluno.init(connection);
AtividadeAluno.init(connection);

Usuario.associate(connection.models);
Turma.associate(connection.models);
Questao.associate(connection.models);
Duvida.associate(connection.models);

module.exports = connection;
