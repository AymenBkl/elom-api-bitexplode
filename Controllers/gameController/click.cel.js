const gameHandler = require('../../handlerGame/response.controller');


module.exports.clickCel = async (res,game,rowIndex,colIndex) => {
        let cel = game.matrix[rowIndex][colIndex];
        if (!cel.clicked && game.playing && !game.completed ) {
            game.userClick += 1;
            if (cel.color == 'green'){
                cel.clicked = true;
                    res.json({msg : 'YOU HAVE CLICK RIGHT CELL',success: true,status : 200,response: {userClick: game.userClick, color: 'green'}});

            }
            else {
                cel.clicked = true;
                const indexMines = await loseGame();
                    res.json({msg : 'YOU HAVE CLICK MINE CELL',success: true,status : 200,response: {userClick: game.userClick,indexMines: indexMines,color: 'red'}});
            }
            game.matrix[rowIndex][colIndex] = cel;
        }
    
        
}


async function loseGame() {
    let indexMines = [];
    this.game.completed = true;
    this.game.playing = false;
    await this.game.matrix.map((row,indexRow) => {
        row.map((col,indexCol) => {
            if (col.color == 'red'){
                indexMines.push({indexRow : indexRow, indexCol : indexCol});
            }
        })
    })
    return indexMines;
}