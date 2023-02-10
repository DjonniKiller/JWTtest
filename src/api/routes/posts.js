const { Router } = require('express');
const { getAll, getByAuthor, createPost } = require('../../controllers/posts');
const middleware = require('../../middleware/token_validate');
const router = Router();

router.get('/all', getAll);

router.get('/author', getByAuthor);

router.post('/create', middleware, createPost);

module.exports = router;