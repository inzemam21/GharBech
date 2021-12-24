import express, { Application} from "express";
import {ApolloServer} from "apollo-server-express";
import {connectDatabase} from './database'
import {resolvers, typeDefs} from './graphql'
// import { resolvers} from "./graphql/resolvers";
// import { typeDefs} from "./graphql/typeDefs";



const app = express()
const PORT = 9000

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({db})
    });
    await server.start()
    server.applyMiddleware({app, path: "/api"})
    app.listen(PORT)

    console.log(`[app]: http://localhost:${PORT}`)

    const listings = await db.listings.find({}).toArray()
    console.log(listings)
}
//const server =  new ApolloServer({ typeDefs, resolvers })

// const startup = async () => {
//     await server.start()
//     server.applyMiddleware({app, path: "/api"})
// }
// startup()

// server.applyMiddleware({app, path: "/api"})
mount(express())

