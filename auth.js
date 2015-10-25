var config = require('config').get('auth');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: config.ROOT + "/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      //asynchronous verification, for effect...
      process.nextTick(function () {
          // To keep the example simple, the user's Google profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Google account with a user record in your database,
          // and return that user instead.
          console.log(profile);
          if(profile.email && profile.email.match(/(.*)@fusion\.co\.jp$/)){
              return done(null, profile);
          }else{
                console.log('login failed');
              return done(null, false, {message: 'User not allowed(or email is not given)'});
          }
      });
}));


module.exports = function(app){
    var session = require('express-session')({
        secret: 'efboardsecret',
        resave: false,
        saveUninitialized: false
    });
    app.use(session);

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate('google',
        {scope: ['email', 'https://www.googleapis.com/auth/plus.login']}));

    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/',successRedirect:'/'})
    );
    return session;
}