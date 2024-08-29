const express = require('express')
const router = express.Router()


//controller functions

const {loginUser, signupUser, sendEmail} = require('../controllers/userController')

//login route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signupUser)

//forgot password route
router.post('/forgotpassword', sendEmail)

module.exports = router