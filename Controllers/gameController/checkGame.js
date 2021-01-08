
module.exports.checkGame = async (res,games,gameHash,gameId) => {
    if ((gameHash in games) && (gameId in games[gameHash])){
        let game = games[gameHash][gameId];
        const activeIndex = await getGameActiveIndexs(game.matrix);
        res.json({msg : 'YOU HAVE A GAME',success: true,status : 200,game: 
        {
            game : {
                gameId: game.gameId,
                stake: game.stake,
                numberMines: game.numberMines,
                userClick: game.userClick,
                playing: game.playing,
                completed: game.completed,
              },
            activeIndex:activeIndex,
        }});
    }
    else {
        res.json({msg : 'YOU HAVE NO GAME',success: true,status : 200,game:null});
    }
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