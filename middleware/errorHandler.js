const errorHandler = (err, req, resp, next) => {
    const statusCode = req.statusCode || 500;
    resp.status(statusCode).send({
        status: err.message,
        message: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : null,
    });
    next();
};
module.exports = errorHandler;
