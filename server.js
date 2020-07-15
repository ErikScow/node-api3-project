const express = require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express();

server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().getTime()
  console.log(`${req.method} to ${req.url} at ${time}`)
  next()
}

module.exports = server;
