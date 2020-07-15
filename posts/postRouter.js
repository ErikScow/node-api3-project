const express = require('express');
const postData = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  postData.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not get posts from database'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  postData.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not get post from database'})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  postData.remove(req.params.id)
    .then(numDeleted => {
      res.status(200).json({message: "deleted"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not delete post from database'})
    })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  postData.update(req.params.id, req.body)
    .then(numUpdated => {
      res.status(200).json({message: 'updated'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not update post within database'})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params
  postData.getById(id)
    .then(post => {
      if(post){
        req.post = post
        next()
      } else {
        res.status(404).json({message: 'post not found'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'could not check ds for valid id'})
    })
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: 'missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({message: 'missing required text field'})
  } else {
    next()
  }
}

module.exports = router;
