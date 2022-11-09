import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

export const resolvers = {
  Query: {
    users: (_parent, _args, context) => {
      return context.prisma.user.findMany()
    },
    posts: (_parent, _args, context) => {
      return context.prisma.post.findMany({
        orderBy: [{ createdAt: 'desc' }],
      })
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
    createPost: async (_parent, args, context) => {
      if (!context.req.auth) {
        throw new Error('Unauthorized')
      }
      const authorId = context.req.auth.sub
      const post = await context.prisma.post.create({
        data: {
          body: args.body,
          authorId: authorId,
        },
      })
      pubSub.publish('POST_ADDED', { postAdded: post })
      return post
    },
  },

  Subscription: {
    postAdded: {
      subscribe: () => pubSub.asyncIterator('POST_ADDED'),
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
