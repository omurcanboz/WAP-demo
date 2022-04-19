const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/', songController.getSongList);

router.get('/:key', songController.findByKey);

module.exports = router;