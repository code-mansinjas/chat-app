const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")


const router = require('./routes')
const ConnectMongoDB = require("./db/connectToMongoDB")
const { NotFoundErrorFun, GlobalErrorHandler } = require("./utils/error")


const PORT = process.env.PORT || 5000
const ServerCallbackFun = () => {
    ConnectMongoDB()
    console.log(`Server Running at PORT ${PORT}`)
}


app.use(express.json())
app.use(morgan("dev"))
app.use("/api", router)

app.use("*", NotFoundErrorFun)

app.use(GlobalErrorHandler)

app.listen(PORT, ServerCallbackFun)