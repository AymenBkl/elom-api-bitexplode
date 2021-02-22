

const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

module.exports.getHistory = async (res,gameHash) => {
    hash.findOne({hashId: gameHash})
    .select("-hash -salt")
    .populate({path : "games",match: {completed: true,playing:false}})
        .then(hash => {
            if (hash) {
                res.json({msg : 'YOUR HASH',success: true,status : 200,hash: hash});
            }
            else {
                res.json({msg : 'YOU HAVE NO HASH',success: true,status : 404});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG',success: true,status : 500}); 
        })
}