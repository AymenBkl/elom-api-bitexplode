const hashModel = require('../../Models/hash');
const response = require('../../HashHandler/response.controller');

module.exports.securePassword = (req,res,next) => {
    hashModel.findByUsername(req.body.hashId)
        .then((sanitizedHash) => {
        console.log(sanitizedHash);
        if (sanitizedHash && sanitizedHash.passwordChange == false ){
            sanitizedHash.changePassword(req.body.oldPassword,req.body.newPassword)
                .then(updateHash =>{
                    console.log('updated',updateHash);
                    updateHash.passwordChange = true;
                hashModel.updateOne({hashId:req.body.hashId},updateHash)
                    .then((hash) => {
                        console.log(hash)
                        if (hash){
                            response.response("success", res, "YOUR PASSWORD HAS BEEN Changed", 200,hash);
                        }
                        else {
                          response.response("error", res, 'error', 404,null);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        response.response("error", res, 'error', 500,null);
                    });
            })
            .catch(err => {
                console.log(err)
                response.response("error", res, 'error', 500,null);
            });
        } else {
            response.response("error", res, "Hash DOSN'T EXIST", 404,null);
        }
    },(err) => {
        console.log(err)
        response.response("error", res, 'error', 500,null);
    })
    .catch(err => {
        console.log(err)
        response.response("error", res, 'error', 500,null);
    })
}