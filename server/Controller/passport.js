const passport = require("passport");

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const CLIENT_ID = "***********************************************";
const CLIENT_SECRET = "*********************************************";

passport.use(new GoogleStrategy({
    clientID:    CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    //callbackURL: "http://localhost:5500/auth/google/callback",
    callbackURL: "https://zomato-clone-7.onrender.com/auth/google/callback",
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
