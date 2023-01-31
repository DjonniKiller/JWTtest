const jwt = require('jsonwebtoken');
const { AES } = require('../crypto/crypto');
const { connection } = require('../database/mainConnection');

module.exports = {
    async register(req, res){
        try {
            const { email, password } = req.body;
            if (!email || !password) throw 'Error to get input';
    
            const emailExist = await connection('users').where({email: email}).first();
            if (emailExist) throw 'Email is already exist!';
            
            const encodedPassword = AES.encode(req.body.password, process.env.CRYPTO);

            await connection('users').insert([{email: email, password: encodedPassword}]);
            res.status(200).send('User inserted');
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    },

    async login(req, res){
        try {
            const user = await connection('users').where('email', req.body.email).first();
            if (!user) throw 'Wrong password or email!';
    
            const validPass = (req.body.password === AES.decode(user.password, process.env.CRYPTO));
            if (!validPass) throw 'Wrong password or email!';
    
            //Create and assign a token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT, { expiresIn: 60*30 });
            
            res.status(200).send({token: `Bearer ${token}`});
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    }
}