var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
};

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    // console.log(req);
    res.render('index', { title: 'Express', message: req.flash('message') });
  });

  /* Handle Sign in POST */
  router.post('/sign_in', passport.authenticate('sign_in', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/sign_up', function(req, res){
    res.render('sign_up',{ title: 'Express', message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/sign_up', passport.authenticate('sign_up', {
    successRedirect: '/home',
    failureRedirect: '/sign_up',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  /* Handle Logout */
  router.get('/sign_out', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};

// module.exports = router;
