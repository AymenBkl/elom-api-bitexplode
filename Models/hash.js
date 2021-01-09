const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashSchema = new Schema({
    hashId : {
        type : String,
        required : true,
        unique: true,
    },
    games : [{
        type : mongoose.Types.ObjectId,
        ref : "game"
    }]
},{
    timestamps : true
})



module.exports = mongoose.model('hash',hashSchema);