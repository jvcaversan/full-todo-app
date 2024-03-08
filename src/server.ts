import express, { Request, Response } from "express"
import dbConnect from "./db"

const app = express()

const PORT = 1337

dbConnect();

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})

app.listen(PORT,() => {
    console.log("Server Running");
    
})