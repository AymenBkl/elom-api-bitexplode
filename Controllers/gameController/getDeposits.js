var depositModel = require('../../Models/deposit');
const listUnspent = require('../BitcoinController/listunspent').listUnspent;

module.exports.getDeposits = async (res,addressId,address) => {
    depositModel.find({addressId:addressId}) 
        .then((deposits) => {
            if (deposits && deposits.length > 0 ){
                console.log(deposits)
                proccessListUnspent(address)
                res.json({msg : 'deposit CREATED',success: true,status : 200,deposits:deposits});
            }
            else if (deposits && deposits.length == 0 ){
                res.json({msg : 'DEPOSITS NOT FOUND',success: false,status : 404});
            }
            else {
                res.json({msg : 'SOMETHING WENT WRONG !',success: false,status : 500});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({msg : 'SOMETHING WENT WRONG !',success: false,status : 500});

        })
    
}


function proccessListUnspent(addressId) {
    let addresses = [addressId];
    console.log(addresses);
    listUnspent(addresses)
        .then((result) => {
            console.log(result);
        })
}





