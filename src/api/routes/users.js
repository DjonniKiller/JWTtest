const { Router } = require('express');
const { getAll, deleteUser, getByID, profile } = require('../../controllers/users');
const router = Router();

router.get('/getAll', getAll);

router.delete('/delete', deleteUser);

router.get('/get', getByID);

router.get('/profile', profile);

module.exports = router;