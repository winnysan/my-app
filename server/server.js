import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { expressjwt } from 'express-jwt'
import { readFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import { resolvers } from './resolvers.js'
import { prisma, context } from './context.js'

const PORT = 9000
const JWT_SECRET = Buffer.from('Kn8Q5tyV/V1MHltc4K/pTkVJMlrbKiZv', 'base64')

const app = express()
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
)

app.post('/login', async (request, response) => {
  const { name, password } = request.body
  const user = await prisma.user.findUnique({
    where: { name },
  })
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET)
    return response.status(201).json({
      user: { id: user.id, name: user.name },
      token,
    })
  } else {
    return response.sendStatus(401)
  }
})

const typeDefs = await readFile('./schema.graphql', 'utf8')
const apolloServer = new ApolloServer({ typeDefs, resolvers, context })
await apolloServer.start()
apolloServer.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
})
