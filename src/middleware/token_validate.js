const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');
const error = 'Authencation error!';

module.exports = async (req, res, next) => {
    try {
        //Getting token from request
        const token = req.get('Authorization');
        if (!token) throw error;

        //Decoding token to get data
        const decode = jwt.verify(token, process.env.JWT);
        if (!decode) throw error;

        //Checking if user exist
        const userExist = await connection('users').where('email', decode.email).first();
        if (!userExist) throw error;

        //Checking for expired token
        const nowTime = new Date()/1000;
        if (nowTime > token.exp) throw error;

        next();
    } catch (e) {
        res.status(403).send({error: 'Authencation error!'});
    }
}