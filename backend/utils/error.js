const NotFoundErrorFun = (req, res) => {
    return res.json({ message: "Route Not Found" })
}

const GlobalErrorHandler = (err, req, res, next) => {
    console.log("GlobalErrorHandler ==>> \n")
    if (err) {
        err.statusCode = err.statusCode || 500
        err.message = err.message || "Internal Server Error"
    }
    return res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message
    })
}

const ErrorWrapper = (fun) => {
    return (req, res, next) => {
        try {
            fun(req, res, next)
        } catch (err) {
            console.log("ErrorWrapper ==>>> \n")
            next(err)
        }
    }
}


module.exports = {
    NotFoundErrorFun,
    GlobalErrorHandler,
    ErrorWrapper
}