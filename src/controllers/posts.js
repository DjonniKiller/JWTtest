const { connection } = require('../database/mainConnection');
const jwt = require('jsonwebtoken');

module.exports = {
    async getAll( _, res){
        try {
            const posts = await connection('posts').select('users.username','posts.*').leftJoin('users', 'users.id', 'posts.author');

            res.status(200).send(posts);
        } catch (e) {
            res.status(400).send({error: new Error(e).message});
        }
    },

    async getByAuthor(req, res){
        try {
            const posts = await connection('posts').select().where('author', req.get('AuthorID'));

            res.status(200).send(posts);
        } catch (e) {
            res.status(400).send({error: new Error(e).message});
        }
    },

    async createPost(req, res){
        try {
            const { header, text, token } = req.body;
            if (!header || !text) throw 'No data!'

            const decoded = jwt.verify(token, process.env.JWT);

            console.log(decoded);

            await connection('posts').insert({header: header, text: text, author: decoded.id});

            res.status(200).send('Inserted');
        } catch (e) {
            res.status(400).send({error: new Error(e).message});
        }
    }
}