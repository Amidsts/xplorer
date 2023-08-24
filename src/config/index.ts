import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"


import userApis from "../routes/authRoutes"
import postApis from "../routes/postRoutes"



const app = express()
console.log("welcome to docker!")
require("./db")

app.get("/", (req: Request, res:Response) => {
    res.send("hello from dockerised explorer project")
})

app.use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors())
    .use(morgan("tiny"))
    .use(helmet())

app
    .use("/api/v1", userApis)
    .use("/api/v1", postApis)

export default app
