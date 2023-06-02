const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiarySchema=new Schema({
    date:{
        type:String,
        required: true
    },
    movies:[
        {
            type: Number,
            unique:true,
            
        } 
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Diary',DiarySchema);