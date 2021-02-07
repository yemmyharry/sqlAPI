require('dotenv').config()
const express = require('express');
const app = express();
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')
const imageRoute = require('./routes/images')

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.use('/images', imageRoute)

app.listen(3000, function() {
    console.log('Listening')
}) 