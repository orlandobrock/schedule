const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../models/tb_usuario");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await Usuario.findOne({
      where: { email: email },
      attributes: ["id", "email", ["senha", "password"]],
    });
    console.log(
      `Senha banco:${user.dataValues.password}\nSenha digitada: ${password}`
    );
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    if (password == user.dataValues.password) {
      return done(null, user);
    } else {
      return done(null, false);
    }

    // try {
    //   if (await bcrypt.compare(password, user.password)) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false, { message: "Password incorrect" });
    //   }
    // } catch (e) {
    //   return done(e);
    // }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.dataValues.id));
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
}

module.exports = initialize;
