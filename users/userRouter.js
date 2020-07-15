const express = require('express');
const userData = require('./userDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userData.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not post user to database'})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  userData.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not post post to database'})
    })
});

router.get('/', (req, res) => {
  userData.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could get users from database'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params
  userData.getById(id)
    .then(user => {
      if(user){
        req.user = user
        next()
      } else {
        res.status(404).json({message: "user not found"})
        next({error})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not check db for valid id'})
    })
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: 'missing user data'})
  } else if (!req.body.name) {
    res.status(400).json({message: 'missing required name field'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: 'missing poost data'})
  } else if (!req.body.text) {
    res.status(400).json({message: 'missing required text field'})
  } else {
    next()
  }
}

module.exports = router;
