const mongoose=require("mongoose")
const {productmodel}=require("./productmodel")
const {user}=require("./usermodel")

const carditemSchema=mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:Number
})

const cartschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    item:[carditemSchema]

})

const cartmodel=mongoose.model("cart",cartschema)

module.exports={
    cartmodel
}