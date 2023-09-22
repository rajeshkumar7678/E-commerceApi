const mongoose=require("mongoose")

const categoryschema=mongoose.Schema({
    name:String,
    description:String
})

const categorymodel=mongoose.model("categorie",categoryschema)

module.exports={
    categorymodel
}