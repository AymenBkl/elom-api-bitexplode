const mongoose = require('mongoose');

const hashUniqueValidator = require('./validators/hashUniqueValidator');

const Schema = mongoose.Schema;

const hashSchema = new Schema({
    hashId : {
        type : String,
        required : true,
        unique: true,
    },
    games : [{
        type : mongoose.Types.ObjectId,
        ref : "game",
    }]
},{
    timestamps : true
})


hashUniqueValidator.validators.hashValidator(hashSchema);
module.exports = mongoose.model('hash',hashSchema);