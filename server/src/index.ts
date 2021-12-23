import express from "express";
import {ApolloServer} from "apollo-server-express";
import { resolvers} from "./graphql/resolvers";
import { typeDefs} from "./graphql/typeDefs";



const app = express()
const PORT = 9000

const server =  new ApolloServer({ typeDefs, resolvers })

const startup = async () => {
    await server.start()
    server.applyMiddleware({app, path: "/api"})
}
startup()

// server.applyMiddleware({app, path: "/api"})


app.listen(PORT)

console.log(`[app]: http://localhost:${PORT}`)