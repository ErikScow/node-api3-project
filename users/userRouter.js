const express = require('express');
const userData = require('./userDb')
const postData = require('../posts/postDb')

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
  req.body.user_id = req.user.id
  postData.insert(req.body)
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

router.get('/:id', validateUserId, (req, res) => {
  userData.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not get user from database'})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userData.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not get posts from database'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  userData.remove(req.params.id)
    .then(numDeleted => {
      res.status(200).json({message: "deleted"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not delete user from database'})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  userData.update(req.params.id, req.body)
    .then(numUpdated => {
      res.status(200).json({message: "updated"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not update user within database'})
    })
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
