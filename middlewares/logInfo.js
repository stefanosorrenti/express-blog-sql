const logInfo = (req, res, next) => {
    console.log('La middleware sta loggando');

    next()
    
};

module.exports = logInfo;