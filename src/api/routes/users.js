const { Router } = require('express');
const { getAll } = require('../../modules/users');
const router = Router();

router.get('/getAll', getAll);

router.delete('/delete:id',);

router.get('/get:id',);

module.exports = router;