import express from 'express'
import chalk from 'chalk'
import asciify from 'asciify'
import { ApolloServer } from 'apollo-server-express'

import { resolvers, typeDefs } from '../graphql'
import { checkJwt } from '../middlewares/auth'
import { corsMiddleware } from '../middlewares/cors'

const { PORT } = process.env

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const app = express()

app.use(corsMiddleware)

app.all('*', checkJwt, (req, res, next) => {
  next()
})

server.applyMiddleware({ app, path: '/gql' })

app.listen(PORT, () => {
  asciify('R&M WIKI API', { font: 'linux' }, (err: any, res: any) => {
    console.log(chalk.bgHex('#6ab04c').hex('#dff9fb')(`✨ Magic happens on port ${PORT}! ✨`))
    console.log(chalk.cyan(res))
  })
})
