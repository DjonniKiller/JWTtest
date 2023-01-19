const users = require('../connections/main');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        let token = req.get('Authorization');
        token = token.replace('Bearer ', '');
        if (!token) throw 'Cannot get token!';

        const decode = jwt.verify(token, keys.jwt);
        if (!decode) throw 'Decoding error!';

        const userExist = users.find(el => el.email === decode.email);
        if (!userExist) throw 'Cannot find user!';

        const nowTime = new Date()/1000;
        if (nowTime > token.exp) throw 'Expired token!';

        next();
    } catch (e) {
        res.status(403).send(new Error(e).message);
    }
}