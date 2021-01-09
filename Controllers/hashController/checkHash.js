var hash = require('../../Models/hash');
var game = require('../../Models/game');


module.exports.checkHash = async (req,res,hashId) => {
    hash.findOne({hashId : hashId})
    .populate({path : "games"})
    .then(currentHash => {
        if (currentHash) {
            res.json({msg : 'YOUR CURRENT HASH',success: true,status : 200,hash : currentHash });
        }

        else {
            res.json({msg : 'THIS HASH IS NOT REGISTRED',success: false,status : 404});
        }
    })
    .catch(err => {
        console.log(err);
    })

    
}