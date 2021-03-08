

const address = require('../Models/bitcoin-addresses');

const listUnspent = require('../Controllers/BitcoinController/listunspent').listUnspent;

const deposit = require('../Models/deposit');


var depositApi = () => {
    address.find({})
        .then(addresses => {
            console.log(addresses);
            if (addresses && address.length > 0) {
                listUnspent(addresses)
                    .then(async (result) => {
                        if (result && result.data && result.data.result.length > 0){
                            await proccessListUnspent(result.data.result);
                            console.log("finished");
                        }
                    })
            }
        })
}


async function proccessListUnspent(listUnspent) {
    let addressDeposits = {}
    console.log(listUnspent);
    await Promise.all(listUnspent.map(unspent => {
        if (addressDeposits[unspent.address]){
            addressDeposits[unspent.address].push(constructDepost(unspent));
        }
        else {
            addressDeposits[unspent.address] = [constructDepost(unspent)];
        }
    }))
    return addressDeposits;
}

function constructDepost(unspent){
    return {
        txid: unspent.txid,
        address: unspent.address,
        amount: unspent.amount,
        currentBalance: unspent.amount,
    }
}

function insertNewDeposts(){

}


depositApi();
setInterval(() => {
    depositApi()}
    ,300000);

