const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[],
    shippingAddress:String,
    city:String,
    pincode:Number,
    district:String,
    phone:Number,
    status:String,
    totalPrice:Number,
    user:String,
    dateOrdered:{type:Date,default:Date.now()}
})

exports.Orders = mongoose.model('Orders',orderSchema);
