const { Router } = require('express');
const AuthRoutes = require('./routes/auth');
const UsersRoutes = require('./routes/users');
const router = Router();

router.use('/auth', AuthRoutes);

router.use('/users', UsersRoutes);

module.exports = router;