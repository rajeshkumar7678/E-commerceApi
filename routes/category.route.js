const express=require("express")
const { categorymodel } = require("../model/category")

let catroute=express.Router()

catroute.get("/",(req,res)=>{
    res.send("category route")
})

catroute.get("/allcat",async(req,res)=>{
    try {
        let cat=await categorymodel.find()
        res.status(200).send({"categories":cat})
    } catch (error) {
        res.send(error)
    }
})

catroute.post("/cat",async(req,res)=>{
    try {
        let {name,description}=req.body
        let cat=await categorymodel.findOne({name})
        if(cat){
            return res.status(400).send({"msg":"category already present"})
        }
        let newcat=new categorymodel({name,description})
        await newcat.save()
        console.log(newcat)
        res.status(200).send({"msg":"category added successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports={
    catroute
}