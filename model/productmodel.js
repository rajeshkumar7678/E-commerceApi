const mongoose=require("mongoose")
const {categorymodel}=require("./category")

const productschema=mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    availablity:Boolean,
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
    }
})

let productmodel=mongoose.model("product",productschema)
module.exports={
    productmodel
}