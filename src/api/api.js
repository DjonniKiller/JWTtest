const { Router } = require('express');
const AuthRoutes = require('./routes/auth');
const UsersRoutes = require('./routes/users');
const PostsRoutes = require('./routes/posts');
const validationMiddleware = require('../middleware/token_validate');
const router = Router();

router.use('/auth', AuthRoutes);

router.use('/users', validationMiddleware, UsersRoutes);

router.use('/posts', PostsRoutes);

module.exports = router;
