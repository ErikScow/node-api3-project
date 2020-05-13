const express = require('express')
const userRouter = require('./users/userRouter')
const userData = require('./users/userDb')
const postRouter = require('./posts/postRouter')
const postData = require('./posts/postDb')

const server = express()

server.use(express.json())
server.use(logger)

function logger(req, res, next){
    console.log(`${new Date()}: ${req.method} to ${req.url} from ${req.get('Origin')}`)
    next()
}

server.listen(5000, () => {
    console.log('Server is listening on port 5000')
})