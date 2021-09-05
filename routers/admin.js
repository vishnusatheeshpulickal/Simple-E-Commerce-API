const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const {Product} = require('../models/product');

// List of all users
router.get('/userslist', async(req,res)=>{
    let users = await User.find().select('-password');
    if(!users) return res.status(400).json({success:false,message:'cannot get users'});
    res.status(200).send(users)
})

// Count of products
router.get('/productcount',async(req,res)=>{
    const productCount = await Product.countDocuments();
    if(!productCount) return res.status(400).json({success:false})
    res.status(200).json({productCount:productCount});
  })

  //  Delete a product
router.delete('/productdelete/:id',async(req,res)=>{
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

  // Update product
router.put('/updateproduct/:id',async(req,res)=>{
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
  router.post('/newproduct/',async(req,res)=>{
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

  // users count
router.get('/usercount',async(req,res)=>{
  const count = await User.countDocuments();
  if(!count) return res.status(500).json({success:false});
  res.status(200).send(count)
})

// Category update
router.put('/categoryupdate/:id',async(req,res)=>{
  try{
      let category = await Category.findByIdAndUpdate(req.params.id,{
          name: req.body.name,
          icon:req.body.icon,
          color:req.body.color
      },{new:true})
      console.log(category)
    if(!category) return res.status(400).json({success:false,message:'The category cannot be created!'});
    res.status(200).send(category)
  }catch(err){
   return res.status(500).json({success:false,error:err})
  }
})
  
// Delete a user
router.delete('/deleteuser/:id',async(req,res)=>{
  const user = await User.findByIdAndRemove(req.params.id);
  if(!user) return res.status(400).json({success:false,message:'The user which given Id is found'});
  res.status(200).json({success:true,message:'Successfully removed the user'})
})

module.exports = router;