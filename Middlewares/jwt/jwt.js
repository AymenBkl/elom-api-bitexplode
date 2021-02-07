const passport = require("passport");

const passportJwtStrategy = require("passport-jwt").Strategy;

const extractJwt = require("passport-jwt").ExtractJwt;

const JWT = require("jsonwebtoken");

const hash = require("../../Models/hash"); 

const config = require('../../config').config;

module.exports.getToken = (hash) => {
  console.log(hash);
  return JWT.sign(hash,config.token.secretKey,
    {
    expiresIn: config.token.tokenExperationDate,
  });
};

var opts = {};

opts.secretOrKey = config.token.secretKey;

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use(
  new passportJwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt:payload", jwt_payload);

    hash.findOne({ _id: jwt_payload._id }, (err, hashs) => {
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

var localStrategy = require("passport-local").Strategy;
exports.localStrategy = passport.use('local',new localStrategy({usernameField: 'hashId'},hash.authenticate()));

passport.serializeUser(hash.serializeUser());
passport.deserializeUser(hash.deserializeUser());

exports.verifyHash = passport.authenticate("jwt", { session: false });



