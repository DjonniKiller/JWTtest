const { Router } = require('express');
const { register, login } = require('../modules/auth');
const { getUsers } = require('../modules/getUsers');
const router = Router();

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", login);

module.exports = router;