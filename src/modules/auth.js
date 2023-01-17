const Users = require('../connections/main');
const jwt = require('jsonwebtoken');
const { AES } = require('../crypto/crypto');
const key = "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B"

module.exports = {
    register(req, res){
        try {
            const { email, password } = req.body;
            if (!email || !password) throw 'Error to get body params';
    
            const emailExist = Users.find( obj => email === obj.email);
            if (emailExist) throw 'Email is already registered!';
            
            const user = {
              email: req.body.email,
              password: AES.encode(req.body.password, key),
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
    
            const validPass = (req.body.password === AES.decode(user.password, key));
            if (!validPass) return res.status(400).send("Password is wrong");
    
            //Create and assign a token
            const token = jwt.sign({ _id: user.id }, 'shhhhh');
            res.header("auth-token", token).send(token);
        } catch (e) {
            const error = new Error(e);
            res.status(400).send({error: error.message});
        }
    }
}