const express = require('express');
const postData = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({message: "router working"})
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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

module.exports = router;
