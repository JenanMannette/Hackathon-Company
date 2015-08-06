require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');


var routes = require('./routes/index');
var users = require('./routes/users');


var passport = require('passport');
var cookieSession = require('cookie-session');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log('in local strat');
      var users = db.get('users');
      users.findOne({email: username}, function (err, doc) {
        if (bcrypt.compareSync(password, doc.password)) {
          return done(null, {email: doc.email, id: doc._id})
        }
        return done(null, false);

      });
    })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(function (req, res, next) {
  res.locals.user = req.user;
  //res.locals.authenticated = !req.user.anonymous;
  next();
});

app.use('/', routes);
app.use('/users', users);



app.post('/local-reg', function (req, res, next) {
  var users = db.get('users');
  console.log(req.body.password);
  var hash = bcrypt.hashSync(req.body.password, 8);
  var user = {
    email: req.body.username,
    password: hash
  };
  users.insert(user, function (err, doc) {
    console.log(doc);
    doc.id=doc._id;

    req.login(doc, function(err,test) {
      console.log(test);
      if (err) {
        console.log(err);
      } else {
        return res.redirect('/');
      }

    });
    //res.redirect('/')
  })
});

app.post('/local-login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
