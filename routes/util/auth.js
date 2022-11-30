const ensureAuthentication = (req, res, next) => {
    if (req.session.passport) {
        return next();
    } else {
        res.status(403).json({msg: 'Please login to view this page.'});
    }
}

const ensureNotAuthentication = (req, res, next) => {
    if (!req.session.passport) {
        return next();
    } else {
        res.status(403).json({msg: 'Please logout to view this page.'})
    }
}

module.exports = {ensureAuthentication, ensureNotAuthentication};
