const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    watchLater:[
        {
            type: Number,
            default: [],
           
        }
    ],
    favourites:[
        {
            type: Number,
           
            default: [],
            
        }
    ],
    likes:[
        {
            type: Number,
           
            default: [],
            
        }
    ]

});

UserSchema.plugin(passportLocalMongoose);//has username password embedded in it

module.exports = mongoose.model('User', UserSchema);