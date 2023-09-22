const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { cartmodel } = require("../model/cart.model")
const { ordermodel } = require("../model/order.model")

const orderroute=express.Router()

orderroute.get("/",auth,(req,res)=>{
    res.send("order route")
})

orderroute.post("/place",auth,async(req,res)=>{
    try {
        let {userid}=req.body
        let cart=await cartmodel.findOne({user:userid}).populate("item.product");
        if(!cart || cart.item.length==0){
            return res.status(400).send({ "msg": "Cart is empty" });
        }

        const total = cart.item.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);
        console.log(total)

        const order=new ordermodel({
            user:userid,
            item:cart.item.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })
            ),
            total
        })

        await order.save()
        cart.item=[]
        await cart.save()


        res.status(200).send({"msg":"oder place successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})





orderroute.get("/history",auth,async(req,res)=>{
    try {
        let order=await ordermodel.find({user:req.body.userid}).populate("item.product")
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


orderroute.get("/order/:orderid",auth,async(req,res)=>{
    try {
        let {orderid}=req.params
        let order=await ordermodel.findById(orderid).populate("item.product").populate("user")

        if (!order) {
            return res.status(404).send({ "msg": "Order not found" });
        }

        res.status(200).send({"orderdetails":order})
    } catch (error) {
        res.status(500).send(error.message)
    }
})
















module.exports={
    orderroute
}