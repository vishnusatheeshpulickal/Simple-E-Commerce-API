const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    street:{type:String,default:''},
    city:{type:String,required:true,default:''},
    district:{type:String,required:true},
    pincode:{type:Number,required:true},
    phone:{type:Number,required:true},
    isAdmin:{type:Boolean,default:false}
})

exports.User = mongoose.model('User',userSchema);
 