const getInfo = require('./getInfo').getInfo;

const hash = require('../../Models/hash');

const address = require('../../Models/bitcoin-addresses');

module.exports.getNewAddress = (hashId) => {
    hash.findOne({hashId: hashId})
    .populate({path : "address"})
        .then((hash) => {
            console.log('hash',hash);
            if (hash && hash.address != null){
                res.json({err:"Conflict",method:url,status:409,message:"Address Already Exists"});
            }
            else if (hash && hash.address == null){
                var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
                getInfo('getnewaddress',dataString)
                    .then((result) => {

                    })
                    .catch(err => {

                    })
            }
        })
        .catch(err => {
            res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)});
        })
}


function inserNewAddress(res,hashId,newAddress) {
    address.create(newAddress)
        .then((newCreatedAddress) => {
            if (newCreatedAddress) {
                console.log(newCreatedAddress);
                addAddressToHash(res,hashId,newCreatedAddress)

            }
        })
        .catch(err => {

        })
}


function addAddressToHash(res,hashId, address) {
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
    .then(() => {
      
    })
    .catch((err) => {
      console.log(err);
    })
  }