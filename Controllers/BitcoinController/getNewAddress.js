const getInfo = require('./getInfo').getInfo;

const hash = require('../../Models/hash');

const address = require('../../Models/bitcoin-addresses');

const bitcoinHandler = require('../../BitcoinHandler/response.controller');

module.exports.getNewAddress = (res,hashId) => {
    hash.findOne({hashId: hashId})
    .populate({path : "address"})
        .then((hash) => {
            if (hash && hash.address != null){
                bitcoinHandler.response('err',res,'Conflict',500,'Address Already Exists','getnewaddress')
            }
            else if (hash && hash.address == null){
                var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
                getInfo('getnewaddress',dataString)
                    .then((result) => {
                        console.log(result.data.result); 
                        insertNewAddress(res,hash._id,result.data.result)
                    })
                    .catch(err => {
                        bitcoinHandler.response('err',res,'Something Went Wrong !' + err,500,null,'getnewaddress')
                    })
            }
        })
        .catch(err => {
            bitcoinHandler.response('err',res,'Something Went Wrong !' + err,500,null,'getnewaddress')
        })
}


function insertNewAddress(res,hashId,newAddress) {
    console.log("hereaddress",newAddress)
    address.create({address:newAddress,hashId:hashId})
        .then((newCreatedAddress) => {
            console.log(newCreatedAddress)
            if (newCreatedAddress) {
                console.log(newCreatedAddress);
                addAddressToHash(res,hashId,newCreatedAddress)
            }
        })
        .catch(err => {
            console.log(err);
            bitcoinHandler.response('err',res,'Something Went Wrong !' + err,500,null,'getnewaddress')
        })
}


function addAddressToHash(res,hashId, address) {
    console.log("adding new address")
    hash.findByIdAndUpdate(hashId , {
      $set : {
        address: address
      }
    },
    {
      upsert:true, new: true
    }
    )
    .select("-hash -salt")
    .then((result) => {
        console.log(result);
      bitcoinHandler.response('success',res,'Address Added',200,address,'getnewaddress')
    })
    .catch((err) => {
        bitcoinHandler.response('err',res,'Something Went Wrong !' + err,500,null,'getnewaddress')
    })
  }