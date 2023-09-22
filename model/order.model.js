const mongoose=require("mongoose")
const {usermodel}=require("./usermodel")
const {productmodel}=require("./productmodel")

const orderschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    item:[
        {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "product", 
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
        },
    ],
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["panding","delivered","shipped"],
        default:"panding"

    }

})

const ordermodel=mongoose.model("order",orderschema)

module.exports={
    ordermodel
}