var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function(app,passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
    
    passport.serializeUser(function(user, done) {
        //token is global variable to have access on /auth/facebook/callback below
        console.log('----------serialize----------',user);
        if (user._json.name.givenName){
            token = jwt.sign({username:user._json.name.givenName + ' ' + user._json.name.familyName, email : user._json.email}, secret , { expiresIn: '24h' });
        }else{
            token = jwt.sign({username:user._json.name, email : user._json.email}, secret , { expiresIn: '24h' });
        }
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('----------deserialize----------',user)
            done(err, user);
        });
    });

    //Facebook Authentication
    passport.use(new FacebookStrategy({
        clientID: '506410799709331',
        clientSecret: 'f1baa07f7f21f338c4218fee4e0886a9',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
            console.log('----------facebookStrategy----------',profile);
            done(null,profile);
      }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),function(req,res){
        res.redirect('/facebook/' + token);
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }) );


    //Twitter Authentication
    passport.use(new TwitterStrategy({
        consumerKey: 'uIo1e7EeAs8OKXZsAAzzSTxsO',
        consumerSecret: '1s3kYDdUIqOEB7W9AC0rfkOnVrltImIy1IKsWjjQdYUw2VaI6x',
        callbackURL: "http://localhost:3000/auth/twitter/callback",
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
      },
      function(token, tokenSecret, profile, done) {
        console.log('----------TwitterStrategy----------',profile);
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        done(null,profile);
      }
    ));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),function(req,res){
        res.redirect('/twitter/'+token);
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));


    //Google Authentication
    passport.use(new GoogleStrategy({
        clientID: '624110997619-hs0soherlej7jkkfmu61i1k6j0gv5ih5.apps.googleusercontent.com',
        clientSecret: 'ZjcqhGm43e6MzhY7yTObTItY',
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
            console.log('----------GoogleStrategy----------',profile);
        //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //      return done(err, user);
        //    });
        done(null,profile);
      }
    ));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
        res.redirect('/google/'+token);
    });
    app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
  
    
    
    


    return passport;

}




