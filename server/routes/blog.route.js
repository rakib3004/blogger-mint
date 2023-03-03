const userConttoller = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.get('/', userConttoller.getAllUser);
router.get('/:username', userConttoller.getUser);
router.post('/', userConttoller.createUser);
router.put('/:username', userConttoller.updateUser);
router.delete('/:username', userConttoller.deleteUser);

module.exports = router;