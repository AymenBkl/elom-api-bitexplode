
const jwt = require('../../Middlewares/jwt/jwt');
const response = require('../../HashHandler/response.controller');
var  passport = require("passport");
const hash= require("../../Models/hash");

module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local',{session: false}, (err, hash, info) => {
            if (!hash) {
                response.response("error", res, info, 401,null);
                next();
            }
                req.logIn(hash, (err) => {
                    if (err) {
                        console.log('err',err)
                        response.response("error", res, err, 401,null);
                    }
                    hash = hash.toObject();
                    delete hash.hash;
                    delete hash.salt;
                    const token = jwt.getToken({ _id: hash._id });
                    response.response("success", res, token, 200,hash);
                })
            })(req, res, next)
    }
}