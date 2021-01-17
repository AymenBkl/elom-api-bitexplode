const gameModel = require('../../Models/game');

const hash = require('../../Models/hash');


module.exports.checkGame = async (res,gameHash,gameId) => {
    gameModel.findOne({hash:gameHash,_id: gameId})
        .select('-data.iv -data.key -data.algorithm')
        .then(async (game) => {
            if (game){
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
                        encryptedData: game.data.encryptedData
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

async function getGameActiveIndexs(gameMatrix) {
    let activeIndexes = [];
    await gameMatrix.map((row,rowIndex) => {
        row.map((col,colIndex) => {
            if (col.clicked) {
                activeIndexes.push({col: col, indexRow: rowIndex,indexCol: colIndex});
            }  
        });
    });
    return activeIndexes;
}