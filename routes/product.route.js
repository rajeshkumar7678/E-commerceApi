const express=require("express")
const { productmodel } = require("../model/productmodel")



const productroute=express.Router()

productroute.get("/",(req,res)=>{
    res.send("product route")
})

//add products---------------------------------------------------------------
productroute.post("/product",async(req,res)=>{
    try {
        let {title,description,price,availablity,categoryid}=req.body
        
        let newproduct=new productmodel({title,description,price,availablity,categoryid})
        await newproduct.save()
        console.log(newproduct)
        res.status(200).send({"msg":"product added successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//get all products-----------------------------------------------------------------
productroute.get("/product",async(req,res)=>{
    try {
        let products=await productmodel.find().populate("categoryid")
        res.status(200).send({"products":products})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

//get the product by id-------------------------------------------------------------
productroute.get("/product/:id",async(req,res)=>{
    try {
        let {id}=req.params
        let product=await productmodel.findOne({_id:id}).populate("categoryid")
        res.status(200).send({"msg":product})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})









module.exports={
    productroute
}