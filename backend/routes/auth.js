const express = require("express")
const { LoginController, SignUpController, LogoutController } = require("../controllers/auth")
const { ErrorWrapper } = require("../utils/error")
const router = express()

router.post("/login", ErrorWrapper(LoginController))
router.post("/signin", ErrorWrapper(SignUpController))
router.post("/logout",ErrorWrapper(LogoutController))

module.exports = router