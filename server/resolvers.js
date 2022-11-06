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

  User: {
    posts: (user, _args, context) => {
      return context.prisma.post.findMany({
        where: { authorId: user.id },
      })
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
