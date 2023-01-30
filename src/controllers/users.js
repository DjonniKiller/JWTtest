const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');

module.exports = {
    async getAll(_, res){
        try{
            const users = await connection('users')
            .select('*');
            
            res.status(200).send(users);
        }catch(e){
            res.status(400).send(new Error(e).message);
        }
    },

    async deleteUser(req, res){
        try {
            const id = req.query.id;
            if (!id) throw 'User don\'t exist';
           
            await connection('users').where('id', id).del();
            res.status(200).send('Deleted');
        } catch (e) {
            res.status(400).send(new Error(e).message);
        }
    },

    async getByID(req, res){
        try {
            const id = req.query.id;
            if (!id) throw 'User don\'t exist';

            const user = await connection('users').where('id', id).first();
            res.status(200).send(user);
        } catch (e) {
            res.status(400).send(new Error(e).message);
        }
    },

    async profile(req, res){
        try{
            let token = req.get('Authorization');
            if (!token) throw error;
            token = token.replace('Bearer ', '');

            const decode = jwt.verify(token, process.env.JWT);
            if (!decode) throw error;

            const user = await connection('users').where('id', decode.id).first();
            res.status(200).send(user);
        } catch(e) {
            res.status(400).send(new Error(e).message);
        }
    }
}