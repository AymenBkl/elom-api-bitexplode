module.exports.getGameActiveIndexs = async (gameMatrix) => {
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