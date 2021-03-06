const getInfo = require('./getInfo').getInfo;

const hash = require('../../Models/hash');

const address = require('../../Models/bitcoin-addresses');

module.exports.getNewAddress = (hashId) => {
    hash.findOne({hashId: hashId})
    .populate({path : "address"})
        .then((hash) => {
            console.log('hash');
            if (hash && hash.address != null){
                res.json({err:"Conflict",method:url,status:409,message:"Address Already Exists"});
            }
            else if (hash && hash.address == null){
                console.log('here');
            }
        })
        .catch(err => {
            res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)});
        })
}