const express = require('express');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('./db').models;
const jwt = require('jwt-simple');


const app = express();
module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

var config = process.env; 
if(process.env.NODE_ENV === 'development'){
  config = require('./config.json');
}
  //strategy consists of things google needs to know, plus a callback when we successfully get a token which identifies the user
  passport.use(new GoogleStrategy({
    clientID: config.CLIENT,
    clientSecret: config.SECRET,
    callbackURL: config.URL 
  }, 
  function (token, refreshToken, profile, done) { 
    //this will be called after we get a token from google 
    //google has looked at our applications secret token and the token they have sent our user and exchanged it for a token we can use
    //now it will be our job to find or create a user with googles information
    if(!profile.emails.length)//i need an email
      return done('no emails found', null);
    console.log('TOKEN', token);
    models.User.findOne({ where: {token: token} })
      .then(function(user){
        console.log(user);
        if(user)
          return user;
        return models.User.create({
          name: profile.emails[0].value, 
          token: token}
        );
      })
      .then(function(user){
        done(null, user); 
      });
  }));

//passport will take care of authentication
app.get('/login/google', passport.authenticate('google', {
	scope: 'email',
  session: false
}));

app.get('/auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/',
  session: false
}), function(req, res,next){
  var jwtToken = jwt.encode({ id: req.user.id }, process.env.JWT_SECRET);
  res.redirect(`/#token=${jwtToken}`);
});


app.use('/api', require('./routes'));
