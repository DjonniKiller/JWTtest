const { connection } = require('../database/mainConnection');

module.exports = {
    async getAll(_, res){
        try{
            const users = await connection('users')
            .select('*')
            .then((users) => {
                return res.json(users);
            });
            
            res.status(200).send(users);
        }catch(e){
            res.status(400).send(new Error(e).message);
        }
    },

    deleteUser(req, res){
        try {
            
        } catch (e) {
            res.status(400).send(new Error(e).message);
        }
    }
}