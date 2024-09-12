const { getAllUserExceptSender, getLoggedUser } = require("../services/user.service")
const response = require("../utils/response")

const getUsersExceptloggedUser = async (req, res) => {
    const { id: senderId } = req.decoded
    const result = await getAllUserExceptSender({ senderId })
    if(result.success){
        return response.OK(res, result)
    }
    return response.NOT_FOUND(res, result)
}

const getLoggedUserController = async (req, res) => {
    const { id: senderId } = req.decoded
    const result = await getLoggedUser({ senderId })
    if(result.success){
        return response.OK(res, result)
    }
    return response.NOT_FOUND(res, result)
}


module.exports = {
    getUsersExceptloggedUser,
    getLoggedUserController
}