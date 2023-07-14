const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema=new Schema({
    name:{
        type:String,
        required: true,
        unique:true
        
    },
    tags:{
        type:String
    },
    description:{
        type:String
    },
    movies:[
        {
            type: Number,
            required:true
        } 
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('List',ListSchema);