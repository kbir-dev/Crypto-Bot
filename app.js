const express = require("express")
const cors = require ("cors")
const userRouter = require("./Api/Routers/userRouter")

// MiddleWare
const app = express()
app.use(express.json({limit:"100kb"}))

app.use(cors())
app.use("*",cors())

// Routers
app.use("/api/v1/user",userRouter)

module.exports = app