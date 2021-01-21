const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header:
    const token = req.header('x-auth-token');

    // if no token => no auth
    if (!token) return res.status(401).json({ msg: 'no token found, authorization denied!' });

    // verify token:
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // in the payload we have user porperty => use it:
        req.user = decoded.user;
        // afterwrads, the ID of this user will be used to fetch user data ...
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'token not valid!' });
    }
}
