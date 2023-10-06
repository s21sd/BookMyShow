// It is for the error Middlewares

function errorHandler(statusCode, err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode || 500).json({
        ok: false,
        message: err.message
    });
}

module.exports = errorHandler;