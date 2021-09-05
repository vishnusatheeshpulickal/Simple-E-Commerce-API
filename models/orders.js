const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{type:mongoose.Schema.Types.ObjectId,ref:'OrderItem',required:false}],
    shippingAddress:{type:String,required:true},
    city:{type:String,required:true},
    pincode:{type:Number,required:true},
    district:{type:String,required:true},
    phone:{type:Number,required:true},
    status:{type:String,default:'pending'},
    totalPrice:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    dateOrdered:{type:Date,default:Date.now}
})

exports.Orders = mongoose.model('Orders',orderSchema);
