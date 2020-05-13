const express = require('express')
const userRouter = require('./users/userRouter')

const server = express()

server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)

function logger(req, res, next){
    console.log(`${new Date()}: ${req.method} to ${req.url} from ${req.get('Origin')}`)
    next()
}

server.listen(5000, () => {
    console.log('Server is listening on port 5000')
})