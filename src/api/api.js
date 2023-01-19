const { Router } = require('express');
const AuthRoutes = require('./routes/auth');
const UsersRoutes = require('./routes/users');
const middleware = require('../middleware/token');
const router = Router();

router.use('/auth', AuthRoutes);

router.use('/users', middleware, UsersRoutes);

module.exports = router;
