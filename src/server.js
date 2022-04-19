const express = require("express");
const routes = require("./routes");
const server = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("../src/config/auth")(passport);
const Usuario = require("../src/models/tb_usuario");
const methodOverride = require("method-override");

const initializePassport = require("../src/config/auth");
initializePassport(passport);

global.users = [];
require("./database");

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(
    session({
      secret: "schedule",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  })
  .use(routes)
  .listen(5000);
