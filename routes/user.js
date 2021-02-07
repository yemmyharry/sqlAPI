const express = require('express')
const {signUp , login} = require('../controllers/user')
const router = express.Router()


router.post('/sign-up', signUp)
router.post('/login', login)

//add validation to both routes 

module.exports = router