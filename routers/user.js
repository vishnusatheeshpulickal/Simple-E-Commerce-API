const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userValidate = require('../validations/userValidation')
const {sendWelcomeMail} = require('../services/email')
require('dotenv/config');

// User Signup section
router.post('/register',userValidate,async(req,res)=>{
    const userEmail = await User.findOne({email: req.body.email});
    if(userEmail) return res.send({success:false,message:'Sorry this email already in use'})
    let user = await new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        street:req.body.street,
        city:req.body.city,
        district:req.body.district,
        pincode:req.body.pincode,
        phone:req.body.phone,
    })
    user = await user.save();
    if(!user) return res.status(400).send({success:false,message:'User cannot created'});
    console.log(user)
    await sendWelcomeMail(user.name,user.email)
    res.status(201).json({success:true,message:'User created successfully'});
})


// User login section 
router.post('/login',async(req,res)=>{
   const user = await User.findOne({email:req.body.email});
   if(!user) return res.status(400).json({success:false,message:'User is not found'})
   if(user && bcrypt.compareSync(req.body.password,user.password)){
       const token = jwt.sign({userEmail:user.email,isAdmin:user.isAdmin,userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
       res.status(200).send({success:true,token:token})
   }else{
       return res.status(400).json({success:false,message:'Email or password is incorrect'});
   }
})

//  user details
router.get('/:id',async(req,res)=>{
    let user = await User.findById(req.params.id);
    if(!user) return res.status(400).json({success:false,message:'The user which given Id is not found'});
    res.status(200).send(user)
})


module.exports = router;        