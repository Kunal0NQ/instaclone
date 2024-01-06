var express = require('express');
var router = express.Router();
const User = require("./users");
const passport = require('passport');
const LocalStratergy = require("passport-local")
const upload = require("./multer")

passport.use(new LocalStratergy(User.authenticate()));

router.get('/', function(req, res) {
  res.render('index', {footer: false});
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

router.get('/feed',isLoggedIn, function(req, res) {
  res.render('feed', {footer: true});
});

router.get('/profile',isLoggedIn, function(req, res) {
  res.render('profile', {footer: true});
});

router.get('/search', function(req, res) {
  res.render('search', {footer: true});
});

router.get('/edit',isLoggedIn, function(req, res) {
  res.render('edit', {footer: true});
});

router.get('/upload',isLoggedIn, upload.single('image'),function(req, res) {
  res.render('upload', {footer: true});
});

router.post('/edit',isLoggedIn, (req, res) => {

})

router.post('/register', async function(req, res) {
  let newuser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  })

  User.register(newuser, req.body.password)
  .then(
    function () {
      passport.authenticate("local")(req, res, 
        function () {
          res.redirect("/profile")
        }
      )
    }
  )
});


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile'
}));


router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}
module.exports = router;
