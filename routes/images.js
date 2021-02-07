const express = require('express')
const {upload} = require('../controllers/image')
const imageUploader = require('../helpers/image-uploader')
const router = express.Router()
const checkAuth = require('../middlewares/check-auth')


router.post('/upload', checkAuth, imageUploader.upload.single('image'), upload)


module.exports = router
