const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const depositSchema = new Schema({
    addressId : {
        type : mongoose.Types.ObjectId,
        ref : "bitcoinaddress"
    },
    txid:{
        type : String,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    currentBalance: {
        type: Number,
        required:true,
    }
},{
    autoIndex:true,
    timestamps : true
})

addressSchema.index({hash:1,_id:1},{name:'hashBitcoin'});
addressSchema.index({address:1},{name:'addressIndex'});

module.exports = mongoose.model('bitcoinaddress',addressSchema);