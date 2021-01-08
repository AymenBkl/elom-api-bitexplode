const gameHandler = require('../../handlerGame/response.controller');


module.exports.clickCel = async (res,game,rowIndex,colIndex) => {
    let cel = game.matrix[rowIndex][colIndex];
    console.log("here",cel,rowIndex,colIndex);
    if (!cel.clicked && game.playing && !game.completed ) {
        if (cel.color == 'green'){
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK RIGHT CELL",200);
        }
        else {
            cel.clicked = true;
            gameHandler.response("success",res,"YOU HAVE CLICK MINE CELL",200);
        }
        game.matrix[rowIndex][colIndex] = cel;
    }
        
}