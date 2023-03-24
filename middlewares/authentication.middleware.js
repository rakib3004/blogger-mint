const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt;

        if (!accessToken) {
            return res.status(401).json({
                message: 'Unauthorized Access',
            });
        }

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);

        const { username } = payload;
        req.username = username;

        return next();
    } catch (err) {
        console.error(err);
        return res.status(400).send('Authentication is failed');
    }
};

module.exports = authenticationMiddleware;
