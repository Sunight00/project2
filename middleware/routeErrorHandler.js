function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
    next();
}

function isAuthenticated(req, res, next) {
    if (req.session.user === undefined){
        return res.status(401).json('You have no access')
    }
    next();
    }

module.exports = {errorHandler, isAuthenticated };
