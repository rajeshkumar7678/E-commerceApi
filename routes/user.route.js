const express=require("express")
const { usermodel } = require("../model/usermodel")
const userroute=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


userroute.get("/",(req,res)=>{
    res.send("userroutes")
})

userroute.post("/register",async (req,res)=>{
    try {
        let {name,email,password}=req.body
        let user=await usermodel.findOne({email})
        console.log(user)
        if(user){
            return res.status(400).send({"msg":"user already present"})
        }
        let hashpass=bcrypt.hashSync(password,5)
        if(!hashpass){
            return res.send("error")
        }
        let newuser=new usermodel({name,email,password:hashpass})
        await newuser.save()
        res.status(200).send({"msg":"user registration successful! please logon"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


userroute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let user=await usermodel.findOne({email})

        if(!user){
            return res.status(400).send({"msg":"user not present register first"})
        }
        let hashpass=await bcrypt.compare(password,user.password)
        if(!hashpass){
            return res.status(400).send({"msg":"password incorrect"})
        }
        console.log(user._id)
        let token=jwt.sign({id:user._id},"rajesh",{expiresIn:"6h"})
        res.status(200).send({"msg":"login successfull","token":token})
    } catch (error) {
        res.status(500).send(error.message)
    }
})






module.exports={
    userroute
}