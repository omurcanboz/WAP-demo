const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:u/pass/:p', userController.checkAuth);

router.get('/:u', userController.getUser);

router.put('/add/:uid', userController.addSong);

router.put('/remove/:uid', userController.removeSong);

module.exports = router;