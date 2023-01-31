const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');
const error = 'Authencation error!';

module.exports = async (req, res, next) => {
    try {
        //Getting token from request
        let token = req.headers.cookie.split('=');
        if (!token) throw error;
        console.log(token);

        //Removing Bearer from token
        token = token[1].split('Bearer%')[1];
        console.log(token);

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
        res.status(403).send(new Error(e).message);
    }
}