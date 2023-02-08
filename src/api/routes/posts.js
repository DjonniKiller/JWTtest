const { Router } = require('express');
const { getAll, getByAuthor, createPost } = require('../../controllers/posts');
const router = Router();

router.get('/all', getAll);

router.get('/author', getByAuthor);

router.post('/create', createPost);

module.exports = router;