import express, { NextFunction } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"


import userApis from "../routes/userRoutes"
import postApis from "../routes/postRoutes"

const app = express()

require("./db")

app.use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors())
    .use(morgan("tiny"))
    .use(helmet())

app
    .use("/api/v1", userApis)
    .use("/api/v1", postApis)

export default app
