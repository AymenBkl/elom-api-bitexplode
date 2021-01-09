var hash = require('../../Models/hash');
var game = require('../../Models/game');

module.exports.createHash = async (res) => {

    createHash(res,0);
    
}
function createLink() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 128;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function createHash(res,number) {
        if (number == 3){
            res.json({msg : 'COULDNT CREATE YOUR HASH' ,success: false,status : 500});
        }
        else {
            let newLink = createLink();
            hash.create({hashId: newLink})
            .then(currentHash => {
                if (currentHash) {
                    res.json({msg : 'YOUR HASH CREATED SUCCESSFULY',success: true,status : 200,hash : currentHash });
                }
        
                else {
                    createHash(res,number + 1);
                }
            })
            .catch(err => {
                createHash(res,number + 1);
            })
        }
}


