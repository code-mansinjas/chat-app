const ConversationModel = require("../models/converstion.model")
const { sendMessage, getMessage } = require("../services/message.service")
const response = require("../utils/response")

const sendMessageController = async (req, res) => {
    const { userId: receiverId } = req.params
    const { id: senderId } = req?.decoded
    const { message } = req.body
    const result = await sendMessage({ message, receiverId, senderId })
    if(result?.success){
        return response.CREATED(res, result)
    }
    return response.NOT_FOUND(res, result)
}

const getMessageController = async ( req, res ) => {
    const { userId: receiverId } = req.params
    const { id: senderId } = req?.decoded

    const result = await getMessage({ receiverId, senderId })
    if(result?.success){
        return response.OK(res, result)
    }
    return response.NOT_FOUND(res, result)
}

module.exports = {
    sendMessageController,
    getMessageController
}