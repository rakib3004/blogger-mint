const authorConttoller = require('../controllers/author.controller');

const express = require('express');
const router = express.Router();

router.get('/', authorConttoller.getAllAuthor);
router.get('/', authorConttoller.getAuthor);
router.post('/', authorConttoller.createAuthor);
router.put('/', authorConttoller.updateAuthor);
router.delete('/', authorConttoller.deleteAuthor);

module.exports = router;