const express = require("express")
const router = express()

const auth = require('./auth')
const message = require('./message')
const user = require('./user')

router.use("/auth",auth)
router.use("/message",message)
router.use("/user",user)

module.exports = router