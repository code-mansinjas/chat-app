const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcryptjs.genSaltSync(10);
const privateKey = process.env.TOKEN_SECRETE_KEY || 'qwertyuiop'

const generateHashedPassword = (plainPassword) => {
    return bcryptjs.hashSync(plainPassword, salt);
}

const compareHashedPassword = (hashedPassword, plainPassword) => {
    return bcryptjs.compareSync(plainPassword, hashedPassword)
}

const generateToken = (data) => {
    return jwt.sign(data, privateKey, { expiresIn: 60 * 60 * 24 })
}

const compareToken = (token) => {
    try {
        return jwt.verify(token, privateKey, {  })
    } catch (err) {
        throw new Error(err)
    }
}


module.exports = {
    generateHashedPassword,
    compareHashedPassword,
    generateToken,
    compareToken
}