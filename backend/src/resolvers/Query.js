const { forwardTo } = require("prisma-binding");

const Query = {
  persons: forwardTo("db")
};

module.exports = Query;
