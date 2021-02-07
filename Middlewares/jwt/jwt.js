const passport = require("passport");

const passportJwtStrategy = require("passport-jwt").Strategy;

const extractJwt = require("passport-jwt").ExtractJwt;

const JWT = require("jsonwebtoken");

const user = require("../../models/user/user"); 

const address = require("../../models/user/address");

const config = require("../../config.json");

const facebookTokenStrategy = require("passport-facebook-token");

module.exports.getToken = (user) => {
  return JWT.sign(user, config.token.secretKey, {
    expiresIn: config.token.tokenExperationDate,
  });
};

var opts = {};

opts.secretOrKey = config.token.secretKey;

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use(
  new passportJwtStrategy(opts, (jwt_payload, done) => {
    user.findOne({ _id: jwt_payload._id }, (err, users) => {
      if (err) {
        return done(err, false);
      } else if (users) {
        return done(null, users);
      } else {
        return done(null, false);
      }
    });
  })
);

var localStrategy = require("passport-local").Strategy;
exports.localStrategy = passport.use(new localStrategy({usernameField: 'phoneNumber'},user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyPharmacy = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'pharmacy') {
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};

exports.verifyPharmacyAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'pharmacy' || req.user.role == 'admin') {
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};

exports.verifyPatient = (req, res, next) => {
  if (req.user) {
    console.log(req.user.role);
    if (req.user.role == 'patient' || req.user.role == 'admin') {
      console.log(true);
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};

exports.verifyPatientAdmin = (req, res, next) => {
  if (req.user) {
    console.log(req.user.role);
    if (req.user.role == 'patient') {
      console.log(true);
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};





exports.facebookToken = passport.use(
  new facebookTokenStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
    },
    (accesToken, refreshToken, profile, done) => {
      user.findOne({ facebookId: profile.id }, (err, users) => {
        if (err) {
          return done(err, false);
        } else if (!err && users != null) {
          return done(false, users);
        } else {
          us = new user({ username: profile.displayName });
          us.firstname = profile.name.givenName;
          us.facebookId = profile.id;
          us.lastname = profile.name.familyName;
          us.save((err, users) => {
            if (err) {
              return done(err, false);
            } else {
              return done(false, users);
            }
          });
        }
      });
    }
  )
);
