const { login, signIn } = require("../services/auth.service")
const response = require("../utils/response")

const LoginController = async (req, res) => {
    const { username, password } = req.body
    const result = await login({ username, password })
    if (result?.success) {
        res.cookie("token",result.token,{
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        return response.OK(res, result)
    }
    return response.NOT_FOUND(res, result)
}

const SignUpController = async (req, res) => {
    const { username, password, gender, confirmPassword } = req.body 
    const result = await signIn({ username, password, gender, confirmPassword })
    if (result?.success) {
        res.cookie("token",result.token,{
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        return response.CREATED(res, result)
    }
    return response.NOT_FOUND(res, result)
}

const LogoutController = async (req, res) => {
    res.cookie("token", "", { maxAge: 0 })
    return response.OK(res, { success: true, message:"User Logout" })
}


module.exports = {
    LoginController,
    SignUpController,
    LogoutController
}