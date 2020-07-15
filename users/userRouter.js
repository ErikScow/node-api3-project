const express = require('express');
const userData = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  res.status(200).json({message: 'it works'})
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
