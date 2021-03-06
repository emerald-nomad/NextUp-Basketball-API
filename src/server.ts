import { GraphQLServer, Options } from 'graphql-yoga'
import { formatError } from 'apollo-errors'
import * as mongoose from 'mongoose'

import { schema } from './schema'
import { createContext } from './context'
import permissions from './permissions'

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    console.log('MongoDB Connected')
  } catch (error) {
    return console.error(error)
  }

  const middlewares = [permissions]

  const server = new GraphQLServer({
    schema,
    context: createContext,
    middlewares
  })

  const port = process.env.PORT || 4000
  const dev = process.env.NODE_ENV !== 'production'

  const options: Options = {
    formatError,
    playground: dev ? '/' : undefined
  }

  server.start(options, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}`)
  )
}

if (process.env.NODE_ENV !== 'test') {
  main()
}
