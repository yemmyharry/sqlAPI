const express = require('express')
const { save, show, index, update, destroy } = require('../controllers/post')
const router = express.Router()

router.post('/', save)

router.get('/:id', show)

router.get('/', index)

router.put('/:id', update)

router.delete('/:id', destroy)


module.exports = router;