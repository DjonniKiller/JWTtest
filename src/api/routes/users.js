const { Router } = require('express');
const { getAll, deleteUser, getByID } = require('../../controllers/users');
const router = Router();

router.get('/getAll', getAll);

router.delete('/delete', deleteUser);

router.get('/get', getByID);

module.exports = router;