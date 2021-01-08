
module.exports.checkGame = async (res,games,gameHash,gameId) => {
    console.log(gameHash,gameId);
    console.log("lol",(gameHash in games));
    if ((gameHash in games) && (gameId in games[gameHash])){
        let game = games[gameHash][gameId];
        const activeIndex = await getGameActiveIndexs(game.matrix);
        let cloneGame = game;
        delete cloneGame['matrix'];
        res.json({msg : 'YOU HAVE A GAME',success: true,status : 200,game: 
        {
            game: cloneGame,
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