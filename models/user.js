const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    street:String,
    city:String,
    district:String,
    pincode:Number,
    phone:Number,
    isAdmin:{type:Boolean,default:false}
})

exports.User = mongoose.model('User',userSchema);