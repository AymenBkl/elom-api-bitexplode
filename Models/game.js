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
        index:true
    },
    completed : {
        type: Boolean,
        required:true,
        default: true,
        index:true
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
    },
    data: {
        algorithm : {
            type : String,
            required:true
        },
        iv: {
            type : String,
            required:true
        },
        key : {
            type : String,
            required:true
        },
        encryptedData: {
            type : String,
            required:true
        }
    },
    status : {
        type: String,
        default:'active'
    }
},{
    autoIndex:true,
    timestamps : true
})

gameSchema.index({hash:1,_id:1},{name:'hashGameId'});
gameSchema.index({completed:1,playing:1},{name:'playingCompletedIndex'});
gameSchema.index({completed:1,playing:1,_id:1},{name:'playingCompletedIdIndex'});

module.exports = mongoose.model('game',gameSchema);