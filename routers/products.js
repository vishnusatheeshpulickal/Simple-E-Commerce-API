const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');
const mongoose = require('mongoose');

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

// Update product
router.put('/:id',async(req,res)=>{
  if(!mongoose.isValidObjectId(req.body.category)){
    return res.status(500).json({success:false,message:'Invalid category Id'})
  }

  const product = await Product.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    brand: req.body.brand,
    category: req.body.category,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    price: req.body.price,
    image: req.body.image,
    numberInStock: req.body.numberInStock,
    numReviews: req.body.numReviews
  },{new:true})
  if(!product) return res.status(500).json({success:false,message:'The product cannot update'});
  res.status(200).send(product);
})

//  Add new product
router.post('/',async(req,res)=>{
  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send('Invalid category')
  
   const products = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    brand: req.body.brand,
    category: req.body.category,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    price: req.body.price,
    image: req.body.image,
    numberInStock: req.body.numberInStock,
    numReviews: req.body.numReviews,
    dataCreated: req.body.date,
   })
  const result = await products.save()
  console.log(result)
  res.status(201).json("Success")
})

//  Delete a product
router.delete('/:id',async(req,res)=>{
  if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).send('Invalid product Id')
  }
  const product = await Product.findByIdAndRemove(req.params.id);
   if(product){
     return res.status(200).json({success: true,message:'Successfully deleted'});
   }else{
     return res.status(404).json({success:false,message:'the given Id is not correct'});
   }
})

// Count of products
router.get('/get/count',async(req,res)=>{
  const productCount = await Product.countDocuments();
  if(!productCount) return res.status(400).json({success:false})
  res.status(200).json({productCount:productCount});
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