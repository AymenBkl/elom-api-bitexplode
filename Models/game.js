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
        index:true,
    },
    matrix : [[{
        color: {
            type: String,
            default: 'green'
        },
        value : {
            type: Number,
            default: 0,
        },
        clicked : {
            type: Boolean,
            default: false
        }
    }]],
    hash : {
        type: mongoose.Types.ObjectId,
        ref: 'hash',
        index:true
    }
},{
    timestamps : true
})



module.exports = mongoose.model('game',gameSchema);