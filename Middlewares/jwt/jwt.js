const passport = require("passport");

const passportJwtStrategy = require("passport-jwt").Strategy;

const extractJwt = require("passport-jwt").ExtractJwt;

const JWT = require("jsonwebtoken");

const hashModel = require("../../Models/hash"); 

const config = require("../../config").config;


module.exports.getToken = (hash) => {
  return JWT.sign(hash, config.token.secretKey, {
    expiresIn: config.token.tokenExperationDate,
  });
};

var opts = {};

opts.secretOrKey = config.token.secretKey;
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use(
  new passportJwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt:payload", jwt_payload);

    hashModel.findOne({ _id: jwt_payload._id }, (err, hashs) => {
        console.log(err,hashs);
      if (err) {
        return done(err, false);
      } else if (hashs) {
        return done(null, hashs);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyHash = passport.authenticate("jwt", { session: false });


var localStrategy = require("passport-local").Strategy;

exports.localStrategy = passport.use(new localStrategy({usernameField:'hashId'},hashModel.authenticate()));
passport.serializeUser(hashModel.serializeUser());
passport.deserializeUser(hashModel.deserializeUser());


