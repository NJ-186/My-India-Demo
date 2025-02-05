const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Server Issue' : err.stack
    });
};

module.exports = { errorHandler };
