var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: 'Express' });
});

router.get('/companySearch',function(req,res) {

  console.log(req.query.companyName);
  axios.get('http://api.glassdoor.com/api/api.htm?t.p=40412&t.k=fvkSeCJKgSQ&userip=0.0.0.0&useragent=&format=json&v=1&l=boulder&q='+ req.query.companyName +'&action=employers')
    .then(function (response) {
      console.log(response);
      res.render('companySearch', response.employers)
    })
    .catch(function (response) {
      console.log(response);
    });

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
