const express = require('express')
const authControllers = require('../../controllers/authControllers')

const router = express.Router()

router.post('/signup',authControllers.singup)
router.post('/loginup',authControllers.loginup)

module.exports = router