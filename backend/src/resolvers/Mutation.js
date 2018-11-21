const Mutations = {
  async createPerson(parent, args, ctx, info) {
    const person = await ctx.db.mutation.createPerson(
      {
        data: {
          ...args
        }
      },
      info
    );
    return person;
  }
};

module.exports = Mutations;
