import * as Process from "process";

require('dotenv').config();

import express, { Application} from "express";
import {ApolloServer} from "apollo-server-express";
import {connectDatabase} from './database'
import {resolvers, typeDefs} from './graphql'



const app = express()

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({db})
    });
    server.applyMiddleware({app, path: "/api"})
    app.listen(process.env.PORT)

    console.log(`[app]: http://localhost:${process.env.PORT}`)


}
//const server =  new ApolloServer({ typeDefs, resolvers })

// const startup = async () => {
//     await server.start()
//     server.applyMiddleware({app, path: "/api"})
// }
// startup()

// server.applyMiddleware({app, path: "/api"})
mount(express())

