

const address = require('../Models/bitcoin-addresses');

const listUnspent = require('../Controllers/BitcoinController/listunspent').listUnspent;

const deposit = require('../Models/deposit');


var depositApi = () => {
    address.find({})
        .then(addresses => {
            if (addresses && address.length > 0) {
                listUnspent(addresses)
                    .then(async (result) => {
                        if (result && result.data && result.data.result.length > 0) {
                            insertNewDeposits(await proccessListUnspent(result.data.result,addresses));
                        }
                    })
            }
        })
}


async function proccessListUnspent(listUnspent,addresses) {
    let addressDeposits = {}
    await Promise.all(listUnspent.map(unspent => {
        const addressId = findAddressId(addresses,unspent.address)
        if (addressDeposits[addressId]) {
            addressDeposits[addressId].push(constructDepost(unspent));
        }
        else {
            addressDeposits[addressId] = [constructDepost(unspent)];
        }
    }))
    return addressDeposits;
}

function findAddressId(addresses,addressUnspent){
    return addresses.filter((address) => address.address == addressUnspent)[0]._id;
}

function constructDepost(unspent) {
    return { 
        txid: unspent.txid,
        address: unspent.address,
        amount: unspent.amount,
        currentBalance: unspent.amount,
    }
}

function insertNewDeposits(addressDeposits) {
    for(let key in addressDeposits){ 
        deposit.bulkWrite(
            addressDeposits[key].map((deposit) => 
            ({
                updateOne: {
                    filter: { txid: deposit.txid },
                    update: {
                        $setOnInsert: {
                            txid: deposit.txid,
                            amount: deposit.amount,
                            addressId: key,
                            currentBalance: deposit.currentBalance 
                        },
                    },
                    upsert: true,
                    new: true, setDefaultsOnInsert: true 
                }
            })
            )
        )
            .then(deposit => { 
                if (deposit && deposit.upsertedIds) {
                    addDepositToAddress(key,Object.values(deposit.upsertedIds))
                }
                else {
                    console.log("error"); 
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function addDepositToAddress(addressId,depositId) {
    console.log('id',addressId,depositId);
    if (depositId.length > 0) {   
        address.findByIdAndUpdate(addressId , {
            $push : {
                deposits: depositId
            }
          },
          {
            new: true,useFindAndModify:true
          }
          )
          .then(() => {
            console.log("success");  
          })
          .catch((err) => {
            console.log(err);
          })
    }
    
}

depositApi();
setInterval(() => {
    depositApi()
}
    , 300000);

