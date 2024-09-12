const express = require("express")
const { LoginController, SignUpController, LogoutController } = require("../controllers/auth.controller")
const { ErrorWrapper } = require("../utils/error")
const authCheck = require("../utils/auth")
const router = express()

router.post("/login", ErrorWrapper(LoginController))
router.post("/signin", ErrorWrapper(SignUpController))
router.post("/logout",authCheck,ErrorWrapper(LogoutController))

module.exports = router