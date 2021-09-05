const express = require('express');
const router = express.Router();
const {Orders} = require('../models/orders')
const {OrderItem} = require('../models/order-items')

// Get all orders
router.get('/',async(req,res)=>{
    const orders = await Orders.find().populate('user','-password').sort({'dateOrdered':-1});
    if(!orders) return res.status(400).json({success:false,message:'Cannot find the orders'});
    res.status(200).send(orders);
})

// Get order details
router.get('/:id',async(req,res)=>{
    const order = await Orders.findById(req.params.id).populate('user','-password').populate({path:'orderItems',populate:{path:'product',populate:'category'}})
    if(!order) return res.status(500).json({success:false,message:'cannot the find order by the given id'});
    res.status(200).send(order)
})

// update a product status
router.put('/:id',async(req,res)=>{
    const order = await Orders.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
    if(!order) return res.status(400).json({success:false,message:'Cannot upadate the order'});
    res.status(200).send(order);
})

// Delete an order 
router.delete('/:id',async(req,res)=>{
    Orders.findOneAndRemove(req.params.id).then(async order=>{
        if(order.orderItems){
           const orderItems = await order.orderItems.map(async orderItems =>{
               const del = await OrderItem.findOneAndRemove(orderItems._id);
           })
           res.status(200).json({success:true,message:'Successfully deleted the order'})
        }else{
            res.status(500).json({success:false,message:'Cannot delete the order'})
        }
    }).catch(err=>{
        res.status(500).json({success:false,message:err})
    })
})

// New order
router.post('/',async(req,res)=>{
    const orderItemIds = Promise.all(req.body.orderItems.map(async item =>{
        let newOrderItem = await new OrderItem({
            product:item.product,
            quantity:item.quantity
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id;
    }))
     
    const orderItemIdsResolved = await orderItemIds;
    console.log(orderItemIdsResolved);

    let order = await new Orders({
        orderItems:orderItemIdsResolved,
        shippingAddress:req.body.shippingAddress,
        city:req.body.city,
        pincode:req.body.pincode,
        district:req.body.district,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user: req.body.user
    })
    order = await order.save();
    if(!order) return res.status(400).json({success:false,message:'Order cannot created'});
    res.status(201).send(order)
})

module.exports = router;    