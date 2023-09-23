const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { cartmodel } = require("../model/cart.model")

const cartroute=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     cartItemSchema:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: The ID of the product in the cart item.
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart item.
 *       required:
 *         - product
 *         - quantity
 *     
 *     cartSchema:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who owns the cart.
 *         item:
 *           type: array
 *           description: An array of cart items containing products and quantities.
 *           items:
 *             $ref: '#/components/schemas/cartItemSchema'
 *       required:
 *         - user
 */

cartroute.get("/",auth,(req,res)=>{
    res.send("cart page")
})

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: Add a product to the user's cart or update the quantity if the product is already in the cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productid:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productid
 *               - quantity
 *     responses:
 *       200:
 *         description: Product added to the cart successfully
 *       400:
 *         description: Bad request, missing required fields or invalid input
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

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
        console.log(error)
        res.status(500).status(500).send(error.message)
    }
})


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's shopping cart
 *     description: Retrieve a user's shopping cart with the list of items.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's shopping cart retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of shopping cart items.
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the cart item.
 *                   product:
 *                     $ref: '#/components/schemas/productSchema'
 *                   quantity:
 *                     type: number
 *                     description: The quantity of the product in the cart.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */


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

/**
 * @swagger
 * /cart/cart/{productid}:
 *   put:
 *     summary: Update the quantity of a product in the user's cart
 *     description: Update the quantity of a specific product in the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productid
 *         in: path
 *         description: ID of the product to update in the cart
 *         required: true
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: body
 *         description: New quantity of the product in the cart
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *         example:
 *           quantity: 3
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Bad request, missing required fields or invalid input
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

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


/**
 * @swagger
 * /api/cart/{productid}:
 *   delete:
 *     summary: Remove a product from the user's cart
 *     description: Remove a specific product from the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productid
 *         in: path
 *         description: ID of the product to remove from the cart
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully
 *       400:
 *         description: Bad request, missing required fields or invalid input
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

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