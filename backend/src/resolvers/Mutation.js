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
  },
  updatePerson(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updatePerson(
      { data: updates, where: { id: args.id } },
      info
    );
  },
  async createFamily(parent, args, ctx, info) {
    const family = await ctx.db.mutation.createFamily(
      {
        data: {
          ...args
        }
      },
      info
    );
    return family;
  },
  updateFamily(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id
    return ctx.db.mutation.updateFamily(
      { data: updates, where: { id: args.id } },
      info
    );
  }
};

module.exports = Mutations;
