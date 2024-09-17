const { compareToken } = require("./common.helper")
const response = require("./response")

const authCheck = async (req, res, next) => {
    try {
        if (!req.headers.authorization){
            return response.UNAUTHORIZED(res, {}, "Token Authentication Needed")
        }
        const token = req.headers.authorization.split(" ")[1]
        if (!token){
            return response.UNAUTHORIZED(res, {}, "Token Authentication Needed")
        }
        // const redisKey = `token-${token}`
        // let tokenData = await RedisGet(redisKey) 
        // if(!tokenData.success){
        //     tokenData = await db.Token.findOne({ where: { accessToken: token } })
        //     if(!tokenData) return res.status(401).json({ success: false, message: "Invalid Token" })
        //     tokenData = tokenData.dataValues
        //     await RedisSet(redisKey,tokenData.accessToken)
        // } 
        const decoded = compareToken(token);
        req.decoded = decoded
        next()
    } catch (ex) {
        response.NOT_FOUND(res, { success: false, error: ex, message:"Error while decoding Token" })
    }
}

module.exports = authCheck