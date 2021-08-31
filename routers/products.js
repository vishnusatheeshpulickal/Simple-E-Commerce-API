const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');

router.get('/',async(req,res)=>{
    const products = await Product.find();  
   res.send(products)
})

router.post('/',async(req,res)=>{
   const products = new Product({
       name:req.body.name,
       price:req.body.price,
       numberInStock:req.body.numberInStock
   })
  const result = await products.save()
  console.log(result)
  res.status(201).json("Success")
})

module.exports = router