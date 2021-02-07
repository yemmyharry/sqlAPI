require('dotenv').config()
const express = require('express');
const app = express();
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')

app.use(express.json())

app.use('/posts', postsRoute)
app.use('/user', userRoute)

app.listen(3000, function() {
    console.log('Listening')
}) 