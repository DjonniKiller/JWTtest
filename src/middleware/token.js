const users = require('../connections/main');
const jwt = require('jsonwebtoken');
const knex = require('knex');

module.exports = async (req, res, next) => {
    try {
        let token = req.get('Authorization');
        token = token.replace('Bearer ', '');
        if (!token) throw 'Cannot get token!';

        const decode = jwt.verify(token, process.env.JWT);
        if (!decode) throw 'Decoding error!';

        const userExist = await knex('users').where('email', decode.email);
        if (!userExist) throw 'Cannot find user!';

        const nowTime = new Date()/1000;
        if (nowTime > token.exp) throw 'Expired token!';

        next();
    } catch (e) {
        res.status(403).send(new Error(e).message);
    }
}