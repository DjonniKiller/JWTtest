const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');
const error = 'Authencation error!';

module.exports = async (req, res, next) => {
    try {
        let token = req.get('Authorization');
        token = token.replace('Bearer ', '');
        if (!token) throw error;

        const decode = jwt.verify(token, process.env.JWT);
        if (!decode) throw error;

        const userExist = await connection('users').where('email', decode.email).first();
        if (!userExist) throw error;

        const nowTime = new Date()/1000;
        if (nowTime > token.exp) throw error;

        next();
    } catch (e) {
        res.status(403).send(new Error(e).message);
    }
}