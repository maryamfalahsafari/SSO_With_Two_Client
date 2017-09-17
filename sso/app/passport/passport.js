//Social Media
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session');


var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var user =require('../models/user');
var client = require('../models/client');
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
            token = jwt.sign({
                username : user._json.name.givenName + ' ' + user._json.name.familyName , 
                email : user._json.email}, secret , { expiresIn: '24h' });
        }else{
            token = jwt.sign({
                username:user._json.name , 
                email : user._json.email}, secret , { expiresIn: '24h' });
        }
        done(null, user.id);
       
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('----------deserialize----------',user)
            done(err, user);
        });
    });
    
    //========== Facebook Authentication ==========
    passport.use(new FacebookStrategy({
        clientID: '1991247504420896',
        clientSecret: '4c8924d1c847f1ec778f7bbe9863ffac',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        //passReqToCallback: true,
      },
      function(accessToken, refreshToken, profile, done) {
            console.log('----------facebookStrategy----------');
            // var keyValPairs = req["headers"]["referer"].split('&');
            // if (keyValPairs.length==1){
            //     console.log('length',1);
            //     profile['referer']=keyValPairs[0].replace('http://localhost:3000/login?clientId=','');
            // }
            // else if (keyValPairs.length==2){
            //     console.log('length',2);
                
            //     profile['referer']=keyValPairs[1].replace('clientId=','');
                
            // }
            done(null,profile);
      }
    ));
    //app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }) );
    app.get("/auth/facebook", function(req, res, next) {
        passport.authenticate("facebook", { scope : ["email"] , state: req.query.queryParams })(req, res, next);
      });
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),function(req,res){
        res.redirect('/social/facebook/' + token + '/' + req.query.state);
    });


    //========== Twitter Authentication ==========
    passport.use(new TwitterStrategy({
        consumerKey: 'rCOg3pi0exZhPlEMwukSWyp8H',
        consumerSecret: 'UWdL10Y60fmIrNssDVOMzLcMFpIIk3c8aFL6U4ejMUUTUYojcc',
        callbackURL: "http://localhost:3000/auth/twitter/callback",
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
        passReqToCallback: true,
      },
      function(req,token, tokenSecret, profile, done) {

        console.log('----------TwitterStrategy----------');
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
        done(null,profile);
      }
    ));    
    //app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get("/auth/twitter", function(req, res, next) {
        var callbackURL = "/auth/twitter/callback" + "?queryParams=" + req.query.queryParams;
        passport.authenticate("twitter", { scope : ["email"], callbackURL: callbackURL })(req, res, next);
    });
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),function(req,res){
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',req.query.queryParams);
        res.redirect('/social/twitter/' + token + '/' + req.query.queryParams);
    });


    //========== Google Authentication ==========
    passport.use(new GoogleStrategy({
        clientID: '670228713739-ei60e083l5qu5d3n33gir6a98gmv135e.apps.googleusercontent.com',
        clientSecret: 'r8ILNf2XBnlkEdyND_Mwenq3',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      function(req,accessToken, refreshToken, profile, done) {
            console.log('----------GoogleStrategy----------');
            // var keyValPairs = req["headers"]["referer"].split('&');
            // if (keyValPairs.length==1){
            //     console.log('length',1);
            //     profile['referer']=keyValPairs[0].replace('http://localhost:3000/login?clientId=','');
            // }
            // else if (keyValPairs.length==2){
            //     console.log('length',2);
                
            //     profile['referer']=keyValPairs[1].replace('clientId=','');
                
            // }
            //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //      return done(err, user);
            //    });
            done(null,profile);
      }
    ));
    //app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get("/auth/google", function(req, res, next) {
        passport.authenticate("google", { scope : ['profile', 'email'] , state: req.query.queryParams })(req, res, next);
    });
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
        res.redirect('/social/google/' + token + '/' + req.query.state);
    });


    //========== JWT Autyhyentication ==========
    passport.use(new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secret},
     function(jwt_payload, done) {
            //  var username = jwt_payload.username;
            //  var password = jwt_payload.email;
             console.log('----------JwtStrategy----------',jwt_payload);

             done(null, {name:jwt_payload.username});
    }));


    return passport;

}




