const { Router } = require('express');
const AuthRoutes = require('./routes/auth');
const UsersRoutes = require('./routes/users');
const passport = require('passport');
const router = Router();

router.use('/auth', AuthRoutes);

router.use('/users', passport.authenticate('jwt', {session: false}), UsersRoutes);

module.exports = router;
