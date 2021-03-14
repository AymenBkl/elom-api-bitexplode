const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');

const getGameActiveIndexs = require('./getActiveIndexes').getGameActiveIndexs;
module.exports.checkGame = async (res,gameHash) => {
    gameModel.findOne({hash:gameHash,completed:false,playing:true,status:'active'})
        .select('-data.iv -data.key -data.algorithm')
        .then(async (game) => {
            if (game){
                console.log(game);
                const activeIndex = await getGameActiveIndexs(game.matrix);
                res.json({msg : 'YOU HAVE A GAME',success: true,status : 200,game: 
                {
                    game : {
                        _id: game._id,
                        stake: game.stake,
                        numberMines: game.numberMines,
                        userClick: game.userClick,
                        playing: game.playing,
                        completed: game.completed,
                        status:game.status,
                        type:game.type,
                        data:{encryptedData: game.data.encryptedData}
                      },
                    activeIndex:activeIndex,
                }});
            }else {
                res.json({msg : 'YOU HAVE NO GAME',success: true,status : 404,game:null});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG',success: true,status : 500,game:null});

        })
}



