const Users = require('../connections/main');

module.exports.getUsers = (_, res) => {
    try{
        res.status(200).send(Users);
    }catch(e){
        const error = new Error(e);
        res.status(400).send({error: error.message});
    }
}