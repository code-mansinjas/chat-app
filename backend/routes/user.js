const express = require("express")
const router = express()

const { ErrorWrapper } = require("../utils/error")
const { getUsersExceptloggedUser, getLoggedUserController } = require("../controllers/user.controller")
const authCheck = require("../utils/auth")

router.get("/except-logged", authCheck, ErrorWrapper(getUsersExceptloggedUser))
router.get("/logged", authCheck, ErrorWrapper(getLoggedUserController))

module.exports = router