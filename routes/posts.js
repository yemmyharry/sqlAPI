const express = require('express')
const { save, show, index, update, destroy } = require('../controllers/post')
const router = express.Router()
const checkAuth = require('../middlewares/check-auth')

router.post('/', checkAuth, save)

router.get('/:id', show)

router.get('/', index)

router.put('/:id', checkAuth, update)

router.delete('/:id',checkAuth, destroy)


module.exports = router;