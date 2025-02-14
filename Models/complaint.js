const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const complaintSchema = new Schema({
    hashId : {
        type : mongoose.Types.ObjectId,
        ref : "hash"
    },
    type:{
        type : String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: String,
        defualt:'in progress',
    },
    response:{
        note:{
            type:String,
        },
        status:{
            type:String,
        }
    }
},{
    autoIndex:true,
    timestamps : true
})

complaintSchema.index({hashId:1},{name:'depositBitcoin'});


module.exports = mongoose.model('complaint',complaintSchema);  