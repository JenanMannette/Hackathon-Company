var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('session/login', {title:'Login'});
});

router.get('/logout', function (req, res, next) {
  req.session=null;
  res.redirect('/')
});

router.get('/register', function (req, res, next) {
    res.render('session/register', {title:'Register'});
})

module.exports = router;
