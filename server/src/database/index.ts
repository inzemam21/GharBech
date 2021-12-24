import {MongoClient} from 'mongodb'

const user = "inzemam21"
const userPassword = 'rikard321'
const cluster = "cluster0.p2sts"

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
export const connectDatabase = async () => {

    const client = await MongoClient.connect(url);

    const db = client.db("main");

    return {
        listings: db.collection("test_listings"),
    };
}