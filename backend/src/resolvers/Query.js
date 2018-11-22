const { forwardTo } = require("prisma-binding");

const Query = {
  persons: forwardTo("db"),
  person: forwardTo("db"),
  family: forwardTo("db"),
  families: forwardTo("db")
};

module.exports = Query;
