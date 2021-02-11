jwt = require('jsonwebtoken')
const secret = 'navuhodnosor'
const cookieName = 'USER_SESSION'

module.exports = function () {
    return (req, res, next) => {
        let token = req.cookies[cookieName]
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.clearCookie(cookieName)
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }

            })
        }

        next();
    }
}