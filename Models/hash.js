const mongoose = require('mongoose');

const hashUniqueValidator = require('./validators/hashUniqueValidator');

const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const hashSchema = new Schema({
    hashId : {
        type : String,
        required : true,
        unique: true,
        index : true
    },
    games : [{
        type : mongoose.Types.ObjectId,
        ref : "game",
    }]
},{
    timestamps : true
})
hashSchema.plugin(passportLocalMongoose,{ usernameField : 'hashId',passwordField: 'password'});

hashSchema.index({hashId:1},{name:'hashIdIndex'});
hashSchema.index({games:1},{name:'gamesIndex'});
hashSchema.index({games:1,hashId:1},{name:'gamesIndexHash'});


hashUniqueValidator.validators.hashValidator(hashSchema);
module.exports = mongoose.model('hash',hashSchema);