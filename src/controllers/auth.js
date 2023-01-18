const Users = require('../connections/main');
const jwt = require('jsonwebtoken');
const { AES } = require('../crypto/crypto');
const keys = require('../config/keys');

module.exports = {
    register(req, res){
        try {
            const { email, password } = req.body;
            if (!email || !password) throw 'Error to get body params';
    
            const emailExist = Users.find( obj => email === obj.email);
            if (emailExist) throw 'Email is already registered!';
            
            const user = {
              email: req.body.email,
              password: AES.encode(req.body.password, keys.crypto),
            };
    

            Users.push(user);
            res.status(200).send(user);
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    },

    login(req, res){
        try {
            const user = Users.find(obj => req.body.email === obj.email);
            if (!user) return res.status(400).send("Email is wrong");
    
            const validPass = (req.body.password === AES.decode(user.password, keys.crypto));
            if (!validPass) return res.status(400).send("Password is wrong");
    
            //Create and assign a token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, keys.jwt, { expiresIn: 60 });

            res.status(200).send({token: `Bearer ${token}`});
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    }
}