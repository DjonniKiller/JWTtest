const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        let token = req.get('Authorization');
        token = token.replace('Bearer ', '');
        if (!token) throw 'Cannot get token!';

        const decode = jwt.verify(token, process.env.JWT);
        if (!decode) throw 'Decoding error!';

        const userExist = await connection('users').where('email', decode.email).first();
        if (!userExist) throw 'Cannot find user!';

        const nowTime = new Date()/1000;
        if (nowTime > token.exp) throw 'Expired token!';

        next();
    } catch (e) {
        res.status(403).send(new Error(e).message);
    }
}