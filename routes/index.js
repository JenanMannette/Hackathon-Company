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
  axios.get('http://api.glassdoor.com/api/api.htm?t.p='+process.env.PARTNER_ID+'&t.k='+process.env.KEY+'&userip=0.0.0.0&useragent=&format=json&v=1&&action=employers', {
    params: {
      'q' : req.query.companyName,
      'l' :'boulder'
    }
  })
    .then(function (response) {
      console.log(response.data.response.employers);
      var data = response.data.response.employers;
      data.forEach(function(e,i){
        e.index = i
        e.search = req.query.companyName
      });
      //console.log(response.data.response.employers);
      res.render('companySearch', {companies:data,search:req.query.companyName})
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
