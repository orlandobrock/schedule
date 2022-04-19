const Usuario = require("../models/tb_usuario");
const Cargo = require("../models/tb_cargo");
const Turma = require("../models/tb_turma");
const Questao = require("../models/tb_questao");
const Atividade = require("../models/tb_atividade");
const TurmaAluno = require("../models/tb_turmaaluno");
const AtividadeAluno = require("../models/tb_atividadealuno");
const Duvida = require("../models/tb_duvidas");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const dbconfig = require("../config/database");
const connection = new Sequelize(dbconfig);
const passport = require("passport");

module.exports = {
  async index(req, res) {
    const ids = req.user;
    const id = parseInt(JSON.stringify(ids));
    const usuarios = await Usuario.findByPk(id, {
      include: { association: "cargo" },
    });

    if (usuarios.cargo.id == 2) {
      const turmas = await TurmaAluno.findAll({
        where: { id_aluno: id },
        attributes: ["id_turma"],
      });
      if (turmas.length != 0) {
        let listaTurma = [];
        turmas.forEach((turma) => {
          listaTurma.push(turma.id_turma);
        });

        const atividade = await connection.query(
          `select a.nm_atividade, b.nm_turma, a.id, a.is_ativa from tb_atividade as a inner join tb_turma as b on b.id = a.id_turma where id_turma in (${listaTurma})`
        );
        let atividades = [];

        atividade[0].forEach((atividade) => {
          atividades.push({
            nomeAtividade: atividade.nm_atividade,
            nomeTurma: atividade.nm_turma,
            idAtividade: atividade.id,
            is_ativa: atividade.is_ativa,
          });
        });
        return res.render("perfil.njk", {
          usuario: usuarios,
          atividade: atividades,
        });
      } else {
        return res.render("perfil.njk", {
          usuario: usuarios,
          atividade: 0,
        });
      }
    } else {
      const turmas = await Turma.findAll({
        attributes: ["nm_turma", "id"],
        where: {
          id_professor: id,
        },
      });
      const atividadesAndamento = await connection.query(
        `select a.nm_atividade, b.nm_turma, a.id, a.is_ativa from tb_atividade as a, tb_turma as b where a.id_turma = b.id and id_professor = ${id}`
      );
      const duvida = await connection.query(
        `select b.enunciado, a.duvida from tb_duvida as a inner join tb_questao as b on a.id_questao = b.id where b.id_atividade in (select a.id from tb_atividade as a, tb_turma as b where a.id_turma = b.id and b.id_professor = (select id from tb_usuario where id = ${id}))`
      );

      let duvidas = [];
      duvida[0].forEach((duvidass) => {
        duvidas.push({
          duvida: duvidass.duvida,
          enunciado: duvidass.enunciado,
        });
      });
      return res.render("perfil.njk", {
        usuario: usuarios,
        duvida: duvidas,
        turma: turmas,
        atividade: atividadesAndamento[0],
      });
      res.json(atividadesAndamento[0]);
    }
  },
  async getTurma(req, res) {
    const ids = req.user;
    const id = parseInt(JSON.stringify(ids));
    const turmas = await Turma.findAll({
      include: [
        {
          model: Usuario,
          as: "aluno",
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id_professor: id,
      },
    });
    const usuarios = await Usuario.findByPk(id, {
      include: { association: "cargo" },
    });
    const duvida = await connection.query(
      `select b.enunciado, a.duvida from tb_duvida as a inner join tb_questao as b on a.id_questao = b.id where b.id_atividade in (select a.id from tb_atividade as a, tb_turma as b where a.id_turma = b.id and b.id_professor = (select id from tb_usuario where id = ${id}))`
    );

    let duvidas = [];
    duvida[0].forEach((duvidass) => {
      duvidas.push({
        duvida: duvidass.duvida,
        enunciado: duvidass.enunciado,
      });
    });
    // return res.render("perfil.njk", {
    //   usuario: usuarios,

    //   turma: turmas,
    //   atividade: atividadesAndamento[0],
    // });
    return res.render("turma.njk", {
      turma: turmas,
      duvida: duvidas,
      usuario: usuarios,
    });
    return res.json(duvidas);
  },
  async setAluno(req, res) {
    const { identificacao, id_turma } = req.body;
    await connection.query(
      `INSERT INTO TB_TURMAALUNO (id_turma, id_aluno) VALUES (${id_turma}, ${identificacao})`
    );
    res.redirect(`/turma/`);
  },
  async verifica(req, res) {
    const { id, id_turma } = req.params;
    const aluno = await Usuario.findByPk(id, {
      attributes: ["id", "id_cargo"],
    });
    let response;
    if (aluno != null) {
      const valida = await connection.query(
        `SELECT a.* FROM TB_TURMAALUNO as a, TB_USUARIO as b WHERE a.id_aluno = ${id} and a.id_turma = ${id_turma} and b.id_cargo not in (1, 3) limit 1`,
        {
          model: TurmaAluno,
          mapToModel: true,
        }
      );
      if (valida.length == 0 && aluno.id_cargo == 2) {
        response = { operacao: true };
      } else {
        response = { error: "Usuario não é um aluno ou já está nessa turma" };
      }
    } else {
      response = { error: "User ID doesn't exist" };
    }

    // res.redirect(`/turma/${req.params.id}`);
    return res.send(response);
  },
  async getQuestao(req, res) {
    const { id } = req.params;
    const questoes = await connection.query(
      `SELECT * FROM TB_QUESTAO WHERE id_atividade = ${id}`,
      {
        model: Questao,
        mapToModel: true,
      }
    );
    return res.render("questionario.njk", {
      questao: JSON.stringify(questoes),
    });
    // res.json(questoes);
  },

  async getResposta(req, res) {
    const request = JSON.parse(req.body.request);
    await connection.query(
      `INSERT INTO TB_ATIVIDADEALUNO (id_aluno, id_atividade) VALUES (${req.user}, ${request[0].questao})`
    );
    if (request[0].acertos.length != 0) {
      for (let i = 0; i < request[0].acertos.length; i++) {
        await connection.query(
          `UPDATE tb_questao set nu_acertos = (select nu_acertos+1 from tb_questao where id = ${request[0].acertos[i]}) where id=${request[0].acertos[i]}`
        );
      }
    }
    if (request[0].duvidasLista.length != 0) {
      for (let i = 0; i < request[0].duvidasLista.length; i++) {
        Duvida.create({
          id_questao: request[0].duvidasLista[i].id_questao,
          duvida: request[0].duvidasLista[i].duvidas,
        });
      }
    }
    return res.redirect("/user/");
    // res.json(request);
  },
  async createAtividade(req, res) {
    await Atividade.create({
      nu_acertos: 0,
      id_turma: req.body.turma,
      nm_atividade: req.body.nomeatividade,
    });
    const max = await Atividade.findOne({
      attributes: ["id"],
      order: [["id", "DESC"]],
    });
    const maxs = parseInt(JSON.stringify(max.id));
    if (
      Object.prototype.toString.call(req.body.enunciado) === "[object Array]"
    ) {
      for (let i = 0; i < req.body.enunciado.length; i++) {
        await Questao.create({
          id_atividade: maxs,
          enunciado: req.body.enunciado[i],
          resp1: req.body.resp1[i],
          resp2: req.body.resp2[i],
          resp3: req.body.resp3[i],
          resp4: req.body.resp4[i],
          respcerta: req.body.respcerta[i],
        });
      }
    } else {
      await Questao.create({
        id_atividade: maxs,
        enunciado: req.body.enunciado,
        resp1: req.body.resp1,
        resp2: req.body.resp2,
        resp3: req.body.resp3,
        resp4: req.body.resp4,
        respcerta: req.body.respcerta,
      });
    }

    return res.redirect("/user");
  },
  async cadastro(req, res) {
    return res.render("cadastro.njk");
  },
  async cadastrar(req, res) {
    await Usuario.create({
      nm_usuario: req.body.name,
      senha: req.body.password,
      email: req.body.email,
      id_cargo: 2,
    });
    res.render("login.njk");
  },
  async login(req, res) {
    res.render("login.njk");
  },
  async makeLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: `/user`,
      failureRedirect: "/login",
      failureFlash: false,
    })(req, res, next);
  },

  async cadturma(req, res) {
    await Turma.create({
      id_professor: req.user,
      nm_turma: req.body.nome,
    });
    res.redirect("/turma/");
  },
  async avaliacao(req, res) {
    res.render("avaliacao.njk");
  },
  async chart(req, res) {
    const acertos = await Questao.findAll({
      where: { id_atividade: req.params.id },
      include: { association: "atividade" },
    });
    const quantidadeAlunos = await connection.query(
      `select count(id) from tb_atividadealuno where id_atividade = ${req.params.id}`
    );
    const quantidadeQuestoes = await connection.query(
      `select count(id) from tb_questao where id_atividade = ${req.params.id}`
    );
    let chart = [];
    let problemas = [];
    let quantidade = parseInt(quantidadeAlunos[0][0].count);
    let quantidadeQuestao = parseInt(quantidadeQuestoes[0][0].count);
    chart.push(["Questões", "Acertos", { role: "style" }]);
    acertos.forEach((acerto, i) => {
      let calculo = (acerto.nu_acertos * 100) / quantidade;
      if (calculo >= 60) {
        chart.push([`${++i}`, acerto.nu_acertos, "blue"]);
      } else {
        chart.push([`${++i}`, acerto.nu_acertos, "red"]);
        problemas.push(acerto.id);
      }
    });
    if (problemas.length > 0) {
      const melhorar = await connection.query(
        `select enunciado from tb_questao where id in (${problemas})`
      );
      res.send({
        chart: chart,
        enunciado: acertos[0].atividade.nm_atividade,
        questoes: melhorar[0],
        quantidade,
      });
    } else {
      res.send({
        chart: chart,
        enunciado: acertos[0].atividade.nm_atividade,
        quantidade,
      });
    }
  },
  async inicio(req, res) {
    return res.render("landingpage.njk");
  },
  async encerrar(req, res) {
    await connection.query(
      `update tb_atividade set is_ativa = false where id = ${req.body.id}`
    );
    return res.redirect("/user");
  },
  async questoes(req, res) {
    const ids = req.user;
    const id = parseInt(JSON.stringify(ids));
    const questoes = await connection.query("select * from tb_questpront");
    const usuarios = await Usuario.findByPk(id, {
      include: { association: "cargo" },
    });
    return res.render("questoes.njk", {
      questao: questoes[0],
      usuario: usuarios,
    });
  },
};
