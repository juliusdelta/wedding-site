const { forwardTo } = require("prisma-binding");

const Query = {
  persons: forwardTo("db"),
  person: forwardTo("db")
};

module.exports = Query;
