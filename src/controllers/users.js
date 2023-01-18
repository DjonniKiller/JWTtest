const connection = require('../connections/main');

module.exports = {
    async getAll(_, res){
        try{
            await res.send(connection);
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