import express from "express";
const app = express()
const PORT = 9000

const one:number = 767

app.get("/", (req,res) => res.send("Hello World"))

app.listen(PORT)

console.log(`[app]: http://localhost:${PORT}`)