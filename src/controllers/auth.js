const jwt = require('jsonwebtoken');
const { AES } = require('../crypto/crypto');
const { connection } = require('../database/mainConnection');

module.exports = {
    async register(req, res){
        try {
            //Getting data from request
            const { username, email, password, phone } = req.body;
            if (!email || !password || !username) throw 'Error to get input';
    

            //Checking for username and e-mail availability
            const emailExist = await connection('users').where({email: email}).first();
            if (emailExist) throw 'Email is already exist!';

            const usernameExist = await connection('users').where({username: username}).first();
            if (usernameExist) throw 'Username is already taken!';
            

            //Encoding password
            const encodedPassword = AES.encode(req.body.password, process.env.CRYPTO);


            //Inserting user into database
            await connection('users')
                .insert([{username:username, email: email, password: encodedPassword, phone: phone}]);


            //Sending 'OK' status
            res.status(200).send('User inserted');
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    },

    async login(req, res){
        try {
            //Checking if user with this email exist
            const user = await connection('users').where('email', req.body.email).first();
            if (!user) throw 'Wrong password or email!';
    

            //Checking for password validation
            const validPass = (req.body.password === AES.decode(user.password, process.env.CRYPTO));
            if (!validPass) throw 'Wrong password or email!';
    
            
            //Create and assign a token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT, { expiresIn: 60 });


            await connection('users').where('email', req.body.email).first().update({token: token});
            
            //Send 'OK' status
            res.status(200).send({token: token});
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    }
}