const express = require('express');
const router = express.Router();

 router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Home'});
});

//  router.get ('/artists', (req,res,next) => {
//    red.render('artist')
//  })

 module.exports = router;