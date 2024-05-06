const passport = require("passport");

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const CLIENT_ID = "360956079453-2u45ft2kicbiu7b5sesosvctu2qgjh9b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID:    CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    //callbackURL: "http://localhost:5500/auth/google/callback",
    callbackURL: "https://zomato-clone-7.onrender.com//auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});