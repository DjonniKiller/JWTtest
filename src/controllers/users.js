const connection = require('../database/mainConnection');

module.exports = {
    async getAll(_, res){
        try{
            const users = await connection('users').select();
            res.send(users);
        }catch(e){
            res.status(400).send(new Error(e).message);
        }
    },

    deleteUser(req, res){
        try {
            connection.splice(req.params.id, 1);
        } catch (e) {
            res.status(400).send(new Error(e).message);
        }
    }
}