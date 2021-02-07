var hashModel = require('../../Models/hash');
var game = require('../../Models/game');
const passport = require("passport");
const jwt = require('../../Middlewares/jwt/jwt');
let crypto = require('crypto');

module.exports.createHash = async (req,res) => {

    createHash(req,res,0);
    
}
function createLink() {
    return crypto.randomBytes(128).toString('hex');

}

function createHash(req,res,number) {
        if (number == 3){
            res.json({msg : 'COULDNT CREATE YOUR HASH' ,success: false,status : 500});
        }
        else {
            let hash =  new hashModel({hashId:createLink()});
            let password = "123456789";
            hashModel.register(hash,password,(err,currentHash) => {
                if (err){
                    createHash(req,res,number + 1);
                }
                else {
                    console.log(currentHash);
                    passport.authenticate("local")(req,res,() => {
                        console.log("here");
                        res.json({msg : 'YOUR HASH CREATED SUCCESSFULY',success: true,status : 200,hash : currentHash,token:jwt.getToken({_id:currentHash._id})});
                    })
                }
            })     
        }
}




