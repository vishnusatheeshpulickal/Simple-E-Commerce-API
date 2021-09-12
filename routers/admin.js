const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const {Product} = require('../models/product');
const {Orders} = require('../models/orders');
const {Category} = require('../models/category');
const multer = require('multer')
const mongoose = require('mongoose')

const FILE_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid file type')
    if(isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(' ','-');
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const uploadOptions = multer({ storage: storage })

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
  router.post('/newproduct/',uploadOptions.single('image'),async(req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category')
    const file = req.file;
    if(!file) return res.status(400).send('No images found in the request');
    const fileName = req.file.filename;
    const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`
    
     const products = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      brand: req.body.brand,
      category: req.body.category,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      price: req.body.price,
      image: `${baseUrl}${fileName}`, 
      numberInStock: req.body.numberInStock,
      numReviews: req.body.numReviews,
      dataCreated: req.body.date,
     })
    const result = await products.save()
    console.log(result)
    res.status(201).json("Success")
  })

  // upload multiple images
  router.put('/products/image-gallery/:id',uploadOptions.array('images',10),async(req,res)=>{
     if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).send({success:false,message:'Invalid product Id'})
     const files = req.files;
     const baseUrl = `${req.protocol}://${req.get('host')}/public/uploads/`
     let imagesPath = [];
     if(files){
       files.map(file =>{
         imagesPath.push(`${baseUrl}${file.filename}`)
       })
     }

     const update = await Product.findByIdAndUpdate(req.params.id,{images: imagesPath},{new:true});
     if(!update) return res.status(400).send({success: false,message:'Product cannot updated'});
     res.status(200).send(update)

  })

  // users count
router.get('/usercount',async(req,res)=>{
  const count = await User.countDocuments();
  if(!count) return res.status(500).json({success:false});
  res.status(200).json({success:true,userscount:count})
})

// Total sales
router.get('/totalsales',async(req,res)=>{
    const totalSales = await Orders.aggregate([
      {$group:{_id:null,totalSales:{$sum:'$totalPrice'}}}
    ])

    if(!totalSales) return res.status(400).json({success:false,message:'The order sales cannot be generated'});
    res.status(200).send({totalsales:totalSales});
})

// Total orders
router.get('/orderscount',async(req,res)=>{
    const count = await Orders.countDocuments();
    if(!count) return res.status(400).json({success:false,message:'The order count cannot be generated'});
    console.log('total count',count)
    res.status(200).json({success:true,total:count})
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