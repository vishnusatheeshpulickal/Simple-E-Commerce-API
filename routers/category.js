const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');

router.get('/',async(req,res)=>{
    let categoryList = await Category.find();
    if(!categoryList) return res.status(500).json({success:false});
    res.status(200).send(categoryList);
})

router.get('/:id',async(req,res)=>{
   try{
    let category = await Category.findById(req.params.id);
    if(!category) return res.status(500).json({success:false,message:'The category given By Id is not found'})
    res.status(200).send(category);
   } catch(err){
     return res.status(500).json({success:false,error:err})
   }
})


router.post('/',async(req,res)=>{
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
     
    category = await category.save();
    if(!category) return res.status(404).send('The category cannot be created!');
    res.send(category)
})

router.delete('/:id',async(req,res)=>{
    try{
        let category = await Category.findByIdAndRemove(req.params.id);
        if(category){
            return res.status(200).json({success:true,message:"Category deleted successfully"})
        }else{
            return res.status(404).json({success:false,message:'Category is not found'})
        }
    }catch(err){
        return res.status(400).json({success:false,error:err})
    }
})

module.exports = router;
