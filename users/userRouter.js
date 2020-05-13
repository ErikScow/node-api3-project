const express = require('express');
const userData = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  
});

router.get('/', (req, res) => {
  
});

router.get('/:id', validateUserId, (req, res) => {
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  
});

router.delete('/:id', validateUserId, (req, res) => {
  
});

router.put('/:id', validateUserId, (req, res) => {
  
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  userData
    .getById(id)
    .then(user => {
      if(user){
        req.user = user
        next()
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(error => {
      console.log(`${req.method} could not complete: `, error)
      res.status(500).json({ error: "could not retrieve from database"})
    })

}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

module.exports = router;
