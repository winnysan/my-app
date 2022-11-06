import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { expressjwt } from 'express-jwt'
import { readFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import { resolvers } from './resolvers.js'

const PORT = 9000
const JWT_SECRET = Buffer.from('Kn8Q5tyZ/V1MHltc4F/pTkVJMlrbKiZt', 'base64')

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

const typeDefs = await readFile('./schema.graphql', 'utf8')
const apolloServer = new ApolloServer({ typeDefs, resolvers })
await apolloServer.start()
apolloServer.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
})
