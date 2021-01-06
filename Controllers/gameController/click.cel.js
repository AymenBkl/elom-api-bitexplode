const gameHandler = require('../../handlerGame/response.controller');


module.exports.clickCel = async (res,game,rowIndex,colIndex) => {
    console.log()
    let cel = game.matrix[rowIndex][colIndex];
        if (cel.color == 'green'){
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK RIGHT CELL",200,game);
        }
        else {
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK MINE CELL",200,game);
        }
    game.matrix[rowIndex][colIndex] = cel;
}