module.exports = {
  eAdmin: function (req, req, next) {
    if (req.isAuthenticated()) {
      return next();
      console.log("sex");
    }

    res.redirect("/login");
  },
};
