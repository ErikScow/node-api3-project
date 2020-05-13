const express = require('express')
const server = express()

//Middleware Implementation
server.use(express.json())
server.use(logger)

//Middleware Functions

function logger(req, res, next){
    console.log(`${new Date()}: ${req.method} to ${req.url} from ${req.get('Origin')}`)
    next()
}

function validateUserId(req, res, next){

}

function validateUser(req, res, next){
    
}

function validatePost(req, res, next){
    
}

//CRUD Operations

server.post('/api/users', (req, res) => {

})

server.post('/api/users/:id/posts', (req, res) => {

})

server.get('/api/users', (req, res) => {

})

server.get('/api/users/:id', (req, res) => {

})

server.get('/api/users/:id/posts', (req, res) => {

})

server.delete('/api/users/:id', (req, res) => {

})

server.put('/api/users/:id', (req, res) => {

})

//Server Listen
server.listen(5000, () => {
    console.log('server live on port 5000')
})