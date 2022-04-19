const express = require("express");
const { render } = require("nunjucks");
var cors = require("cors");
const routes = express.Router();
const usuarioController = require("./controllers/usuarioController");
// const { eAdmin } = require("../src/helpers/eAdmin");

routes.get(
  "/user/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.index
);

routes.post(
  "/turma/cad",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.cadturma
);

routes.get(
  "/user/",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.index
);
routes.get(
  "/turma/",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.getTurma
);
routes.post(
  "/turma/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.setAluno
);
routes.get(
  "/questionario/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.getQuestao
);
routes.post(
  "/questionario",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.getResposta
);
routes.get(
  "/verifica/:id/:id_turma",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.verifica
);
routes.post(
  "/atividade",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.createAtividade
);

routes.get("/cadastro", usuarioController.cadastro);
routes.get(
  "/avaliacao/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.avaliacao
);
routes.get(
  "/chart/:id",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.chart
);

routes.post("/cadastro", usuarioController.cadastrar);
routes.get("/login", usuarioController.login);
routes.post("/login", usuarioController.makeLogin);
routes.get("/", usuarioController.inicio);

routes.post(
  "/encerraratividade",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.encerrar
);

routes.get(
  "/questoes",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  },
  usuarioController.questoes
);

app.get("/api/some/path", (req, res) => {
  res.send("wow, it actually worked");
});

module.exports = routes;
