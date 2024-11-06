const express = require('express');
const router = express();
const UserController = require('../controllers/user.controller');
const userController = new UserController();
router.get('/findUserByYoutubeId', userController.findUserByYoutubeId);
router.post('/createUser', userController.createUser);
router.patch('/modifyUserInfo', userController.modifyUserInfo);
router.delete('/deleteUser', userController.deleteUser);
module.exports = router;
