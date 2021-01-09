const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    stake : {
        type : Number,
        required : true,
        default: 100
    },
    numberMines : {
        type : Number,
        required:true,
        default: 1
    },
    userClick: {
        type : Number,
        required:true,
        default: 0
    },
    playing : {
        type: Boolean,
        required:true,
        default: true,
    },
    completed : {
        type: Boolean,
        required:true,
        default: true,
    },
    hash : {
        type: mongoose.Types.ObjectId,
        ref: 'hash' 
    }
},{
    timestamps : true
})



module.exports = mongoose.model('game',gameSchema);