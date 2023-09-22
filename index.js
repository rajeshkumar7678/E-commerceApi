const express=require("express")
const { connection } = require("./controller/db")
const { userroute } = require("./routes/user.route")
const { catroute } = require("./routes/category.route")
const { productroute } = require("./routes/product.route")
const { cartroute } = require("./routes/cart.route")
const { orderroute } = require("./routes/order.route")
const swaggerJSdoc=require("swagger-jsdoc")

const swaggerUI=require("swagger-ui-express")

const app=express()
app.use(express.json())
const port=4545


app.get("/",(req,res)=>{
    res.send("home page")
})


app.use("/user",userroute)
app.use("/cat",catroute)
app.use("/pro",productroute)
app.use("/cart",cartroute)
app.use("/order",orderroute)



const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4545/"
            }
        ]
    },
    apis:["./routes/*.js"]
}
//specification
const swaggerSpec= swaggerJSdoc(options)
//building UI
app.use("/doc",swaggerUI.serve,swaggerUI.setup(swaggerSpec))











app.listen(port,async()=>{
    try {
        await connection
        console.log("db is conected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${port}`)
})