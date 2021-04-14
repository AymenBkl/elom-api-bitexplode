var depositModel = require('../../Models/deposit');

module.exports.getDeposits = async (res,addressId) => {
    depositModel.find({addressId:addressId}) 
        .then((deposits) => {
            if (deposits && deposits.length > 0 ){
                console.log(deposits)
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





