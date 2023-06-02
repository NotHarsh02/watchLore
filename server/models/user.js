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
            unique:true,
            
        }
    ],
    favourites:[
        {
            type: Number,
            unique:true, 
        }
    ],
    likes:[
        {
            type: Number,
            unique:true, 
        }
    ]

});

UserSchema.plugin(passportLocalMongoose);//has username password embedded in it

module.exports = mongoose.model('User', UserSchema);