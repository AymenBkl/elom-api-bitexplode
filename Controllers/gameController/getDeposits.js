var depositModel = require('../../Models/deposit');
const listUnspent = require('../BitcoinController/listunspent').listUnspent;

module.exports.getDeposits = async (res,addressId,address) => {
    depositModel.find({addressId:addressId}) 
        .then((deposits) => {
            if (deposits && deposits.length > 0 ){
                console.log(deposits)
                proccessListUnspent(res,address,deposits)
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


function proccessListUnspent(res,addressId,deposits) {
    let addresses = [{address:addressId}];
    listUnspent(addresses)
        .then((result) => {
            if (result && result.data && result.data.result.length > 0){
                concatDeposits(res,deposits,result.data.result);
            }
            else {
                res.json({msg : 'deposit CREATED',success: true,status : 200,deposits:deposits});
            }
        })
}

function concatDeposits(res,deposits,realDeposits) {
    let newDeposits = [];
    deposits.map(deposit => {
        let newDeposit =  {realDeposit: realDeposits.filter((realDeposit) => deposit.txid == realDeposit.txid)[0]};
        newDeposit.active = deposit.active;
        newDeposit.amount = deposit.amount;
        newDeposit.currentBalance = deposit.currentBalance;
        newDeposit._id = deposit.currentBalance;
        newDeposit.createdAt = deposit.createdAt;
        newDeposit.txid = deposit.txid;
        newDeposits.push(newDeposit);
    })
    console.log(newDeposits);
    res.json({msg : 'deposit CREATED',success: true,status : 200,deposits:newDeposits});
}







