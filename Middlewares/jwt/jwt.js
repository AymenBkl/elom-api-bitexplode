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
    hashModel.findOne({ _id: jwt_payload._id }, (err, hashs) => {
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

exports.verifyHashValid = (req, res, next) => {
  if (req.user) {
    if (req.user && req.user.status != 'blocked') {
      next();
    } 
    else if (req.user && req.user.status == 'blocked'){
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are blocked'});
    }
    else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};


var localStrategy = require("passport-local").Strategy;

exports.localStrategy = passport.use(new localStrategy({usernameField:'hashId'},hashModel.authenticate()));
passport.serializeUser(hashModel.serializeUser());
passport.deserializeUser(hashModel.deserializeUser());


