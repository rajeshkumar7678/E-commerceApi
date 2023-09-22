const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    password:String
})

const usermodel=mongoose.model("user",userschema)

module.exports={
    usermodel
}