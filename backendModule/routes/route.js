const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/api/createUser', userController.createUser);
router.get('/api/getUser', userController.getUser);
router.put('/api/updateUser/:email', userController.updateUser);
router.delete('/api/deleteUser/:email', userController.deleteUser);

module.exports = router;