const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type:String,required:true},
    description:String,
    richDescription:String,
    brand:String,
    category:String,
    rating:Number,
    isFeatured:Boolean,
    price:{type:Number,required:true},
    image:{type:String},
    images:String,
    numberInStock:{type:Number},
    dataCreated:{type:Date,default:Date.now()}
})

exports.Product = mongoose.model('Product',productSchema);