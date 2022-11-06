export const resolvers = {
  Query: {
    users: (_parent, _args, context) => {
      return context.prisma.user.findMany()
    },
    posts: (_parent, _args, context) => {
      return context.prisma.post.findMany()
    },
    user: (_parent, args, context) => {
      return context.prisma.user.findUnique({
        where: { id: args.id },
      })
    },
    post: (_parent, args, context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id },
      })
    },
  },

  Mutation: {
    register: (_parent, args, context) => {
      return context.prisma.user.create({
        data: args.input,
      })
    },
    createPost: (_parent, args, context) => {
      if (!context.req.auth) {
        throw new Error('Unauthorized')
      }
      const authorId = context.req.auth.sub
      return context.prisma.post.create({
        data: {
          body: args.body,
          authorId: authorId,
        },
      })
    },
  },

  User: {
    posts: (user, _args, context) => {
      return context.prisma.user
        .findUnique({
          where: { id: user.id },
        })
        .posts()
    },
  },

  Post: {
    author: (post, _args, context) => {
      return context.prisma.user.findUnique({
        where: { id: post.authorId },
      })
    },
  },
}
