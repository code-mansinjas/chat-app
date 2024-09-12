const express = require("express")
const { ErrorWrapper } = require("../utils/error")
const { sendMessageController, getMessageController } = require("../controllers/message.controller")
const authCheck = require("../utils/auth")
const router = express()

router.post("/send/:userId",authCheck, ErrorWrapper(sendMessageController))
router.get("/get/:userId",authCheck, ErrorWrapper(getMessageController))

module.exports = router