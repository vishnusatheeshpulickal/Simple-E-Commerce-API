const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');


// Get all products and filtered products
router.get('/',async(req,res)=>{
  let filter = {};
      if(req.query.categories){
      filter = {category:req.query.categories.split(',')}
    }
    console.log(filter);
    const products = await Product.find(filter).select('name description price rating image').populate('category');  
   res.send(products)
})

// Get product details 
router.get('/:id',async(req,res)=>{
  const product = await Product.findById(req.params.id).populate('category');
  if(!product) return res.status(404).json({success:false,message:'The product given by the Id is not found'});
  res.send(product);
})


// Featured Products
router.get('/get/featured/:count',async(req,res)=>{
  const count = req.params.count ? req.params.count : 0;
  const featured = await Product.find({isFeatured:true}).limit(+count)
  if(!featured) return res.status(400).json({success:false,message:'No featured products'})
  if(count > featured.length) res.send({message:`Only ${featured.length} featured products are available`});
  res.status(200).send(featured);
})

module.exports = router