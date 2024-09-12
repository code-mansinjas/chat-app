const mongoose = require("mongoose")

const MONGO_DB_HOST = process.env.MONGO_DB_HOST
const MONGO_DB_PORT = process.env.MONGO_DB_PORT
const MONGO_DB_USER = process.env.MONGO_DB_USER
const MONGO_DB_PASS = process.env.MONGO_DB_PASS
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

let MONGO_DB_URI = process.env.MONGO_DB_URI

const ConnectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI)
        console.log(`Connected to MongoDB`)
    } catch (err) {
        console.log(`Error While Connecting MongoDB \n${err}`)
    }
}

module.exports = ConnectMongoDB