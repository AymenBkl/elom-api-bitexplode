const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address : {
        type : String,
        required : true,
    },
    hashId:{
        type : mongoose.Types.ObjectId,
        ref : "hash"
    },
    deposits: [{
        type : mongoose.Types.ObjectId,
        ref : "depositschema"
    }]
},{
    autoIndex:true,
    timestamps : true
})

addressSchema.index({hash:1,_id:1},{name:'hashBitcoin'});
addressSchema.index({address:1},{name:'addressIndex'});

module.exports = mongoose.model('bitcoinaddress',addressSchema);