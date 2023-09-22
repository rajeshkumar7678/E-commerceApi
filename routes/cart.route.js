const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { cartmodel } = require("../model/cart.model")
const { productmodel } = require("../model/productmodel")

const cartroute=express.Router()

cartroute.get("/",auth,(req,res)=>{
    res.send("cart page")
})


cartroute.post("/add",auth,async(req,res)=>{
    try {
        let{productid,quantity}=req.body

        let {userid}=req.body

        let cart=await cartmodel.findOne({user:userid})
        console.log(cart)
        if(!cart){
            let item=[]
            let item1={product:productid,quantity}
            item.push(item1)
            let cartitem=new cartmodel({user:userid,item})
            await cartitem.save()
            res.send("saved item in the cart")
        }else{
            let cartarray=cart.item
            let exist={}
            cartarray.forEach(element => {
                if(element.product.toString()==productid){
                    exist=element
                    return
                }
            });
            console.log(exist)
            if(exist.quantity){
                exist.quantity=exist.quantity+quantity
            }else{
                cartarray.push({product:productid,quantity})
            }
            await cart.save();
            res.send({"msg":"product added to cart"})
         }
        
    } catch (error) {
        res.status(500).status(500).send(error.message)
    }
})

//get all carddata----------------------------------------------------------------
cartroute.get("/cart",auth,async(req,res)=>{
    try {
        let {userid}=req.body
        let cartitem=await cartmodel.find({user:userid}).populate("item.product");
        res.send(cartitem)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


//update cart----------------------------------------------------------------------
cartroute.put("/cart/:productid",auth,async(req,res)=>{
    try {
        let {productid,}=req.params
        let {quantity,userid}=req.body

        let cart=await cartmodel.findOne({user:userid}).populate(`item`);
        let cartitem=cart.item
        let data=cartitem.find((item)=>item.product==productid)
        data.quantity=quantity
        await cart.save()
    
        res.status(200).send({"msg":"data update successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

cartroute.delete("/cart/:productid",auth,async(req,res)=>{
    try {
        let {productid}=req.params
        let {userid}=req.body

        let cart=await cartmodel.findOne({user:userid}).populate(`item`);
        let cartitem=cart.item
        let data=cartitem.find((item)=>item.product!==productid)
        cart.item=data
        await cart.save()
        // let data=cart.item.findByIdAndDelete({product:productid})
        res.send({"msg":"product deleted from cart"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})



















module.exports={
    cartroute
}