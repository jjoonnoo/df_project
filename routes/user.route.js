const express = require('express')
const router = express()
const UserController = require('../controllers/user.controller')
const userController = new UserController()


module.exports = router