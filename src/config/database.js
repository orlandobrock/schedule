module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "schedule",
  logging: false,
  define: {
    timestamps: false,
    underscored: true,
  },
};
