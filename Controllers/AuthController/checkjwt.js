const passport = require("passport");
module.exports = {
    checkJWT: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, hash, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if (!user) {
                error(res, "TOKEN INVALID", 401,null)
            } else {
                success(res, "TOKEN VALID", 200,hash)

            }
        })(req, res, next)
    }
}


function success(res,token,status,hash){
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Welcom to BITEXPLODE ",success: true,token : token,status : status,hash : hash});
}

function error(res,err,status,hash){
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Something Went Wrong !",success: false,err:err,status : status,hash : hash});
}
