const response = {
    OK : (res, result, message = "") => {
        result.message = message || result.message
        return res.status(200).send(result)
    },
    CREATED : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(201).send(result)
    },
    BAD_REQUEST : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(400).send(result)
    },
    UNAUTHORIZED : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(401).send(result)
    },
    FORBIDDEN : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(403).send(result)
    },
    NOT_FOUND : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(404).send(result)
    },
    INTERNAL_SERVER_ERROR : (res, result = {}, message = "") => {
        result.message = message || result.message
        return res.status(500).send(result)
    }
}

module.exports = response